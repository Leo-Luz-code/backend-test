import { schema } from '@ioc:Adonis/Core/Validator'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories'
import test from 'japa'
import Hash from '@ioc:Adonis/Core/Hash'
import supertest from 'supertest'
import { DateTime, Duration } from 'luxon'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Senha', (group) => {
  test('deve enviar um email com instrucoes de redefinicao de senha', async (assert) => {
    const usuario = await UserFactory.create()

    Mail.trap((message) => {
      assert.deepEqual(message.to, [
        {
          address: usuario.email,
        },
      ])
      assert.deepEqual(message.from, {
        address: 'no-reply@bemobile.com',
      })
      assert.equal(message.subject, 'BeMobile: Recuperação de Senha')
      assert.equal(message.text, 'Clique no link abaixo para redefinir a sua senha\n' + 'url')
    })

    await supertest(BASE_URL)
      .post('/forgot-password')
      .send({
        email: usuario.email,
        resetPasswordUrl: 'url',
      })
      .expect(204)

    Mail.restore()
  })

  test('deve criar um token de redefinição de senha', async (assert) => {
    const usuario = await UserFactory.create()

    await supertest(BASE_URL)
      .post('/forgot-password')
      .send({
        email: usuario.email,
        resetPasswordUrl: 'url',
      })
      .expect(204)

    const tokens = await usuario.related('tokens').query()
    console.log(tokens[0])
    assert.isNotEmpty(tokens)
  }).timeout(0)

  test('deve retornar 422 quando dados requeridos nao forem inseridos ou serem invalidos', async (assert) => {
    const { body } = await supertest(BASE_URL).post('/forgot-password').send({
      // email: usuario.email,
      // resetPasswordUrl: 'url',
    })
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('deve ser capaz de resetar senha', async (assert) => {
    const user = await UserFactory.create()
    const { token } = await user.related('tokens').create({ token: 'token' })

    await supertest(BASE_URL)
      .post('/reset-password')
      .send({ token, password: '123456' })
      .expect(204)

    await user.refresh()
    const checkPassword = await Hash.verify(user.password, '123456')
    assert.isTrue(checkPassword)
  })

  test('deve retornar 404 quando utilizar o mesmo token', async (assert) => {
    const user = await UserFactory.create()
    const { token } = await user.related('tokens').create({ token: 'token' })

    await supertest(BASE_URL)
      .post('/reset-password')
      .send({ token, password: '123456' })
      .expect(204)

    const { body } = await supertest(BASE_URL)
      .post('/reset-password')
      .send({ token, password: '123456' })
      .expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 404)
  })

  test.only('nao pode resetar senha quando token for expirado depois de 2 horas', async (assert) => {
    const user = await UserFactory.create()
    const date = DateTime.now().minus(Duration.fromISOTime('02:01'))
    const { token } = await user.related('tokens').create({ token: 'token', createdAt: date })

    const { body } = await supertest(BASE_URL)
      .post('/reset-password')
      .send({ token, password: '123456' })
      .expect(410)

    assert.equal(body.code, 'TOKEN EXPIRED')
    assert.equal(body.status, 410)
    assert.equal(body.message, 'token has expired')
  })

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
