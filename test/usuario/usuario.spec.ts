import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Usuario', (group) => {
  test('deve criar um usuario', async (assert) => {
    const userPayLoad = {
      email: 'test@test.com',
      password: 'test',
    }
    const { body } = await supertest(BASE_URL).post('/usuarios').send(userPayLoad).expect(201)
    assert.exists(body.usuario, 'Usuario indefinido')
    assert.exists(body.usuario.id, 'Id indefinido')
    assert.equal(body.usuario.email, userPayLoad.email)
    assert.exists(body.usuario.password, 'Senha indefinida')
  })

  test('deve retornar 409 quando email ja estiver em uso', async (assert) => {
    const { email } = await UserFactory.create()
    const { body } = await supertest(BASE_URL)
      .post('/usuarios')
      .send({
        email,
        password: 'test',
      })
      .expect(409)

    console.log({ body })
    assert.exists(body.message)
    assert.include(body.message, 'email')
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 409)
  })

  test('deve retornar 422 quando dados necessarios nao forem recebidos', async (assert) => {
    const { body } = await supertest(BASE_URL).post('/usuarios').send({}).expect(422)
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('deve retornar 422 quando o email for invalido', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/usuarios')
      .send({
        email: 'testtest.com',
        password: 'tesst',
      })
      .expect(422)
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('deve retornar 422 quando a senha for invalida', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/usuarios')
      .send({ email: 'test@test.com', password: 'tet' })
      .expect(422)
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('deve atualizar um usuario', async (assert) => {
    const { id, password } = await UserFactory.create()
    const email = 'test@test.com'

    const { body } = await supertest(BASE_URL)
      .put(`/usuarios/${id}`)
      .send({
        email,
        password,
      })
      .expect(200)

    assert.exists(body.usuario, 'Usario indefinido')
    assert.equal(body.usuario.email, email)
    assert.equal(body.usuario.id, id)
  })

  test('deve atualizar a senha do usuario', async (assert) => {
    const usuario = await UserFactory.create()
    const password = 'test'

    const { body } = await supertest(BASE_URL)
      .put(`/usuarios/${usuario.id}`)
      .send({
        email: usuario.email,
        password,
      })
      .expect(200)

    assert.exists(body.usuario, 'Usuario indefinido')
    assert.equal(body.usuario.id, usuario.id)

    await usuario.refresh()
    assert.isTrue(await Hash.verify(usuario.password, password))
  })

  test('deve retornar 422 quando dados necessarios nao forem recebidos', async (assert) => {
    const { id } = await UserFactory.create()
    const { body } = await supertest(BASE_URL).put(`/usuarios/${id}`).send({}).expect(422)
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('deve retornar 422 quando o email for invalido', async (assert) => {
    const { id, password } = await UserFactory.create()
    const email = 'test@'
    const { body } = await supertest(BASE_URL)
      .put(`/usuarios/${id}`)
      .send({
        password,
        email,
      })
      .expect(422)
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('deve retornar 422 quando a senha for invalida', async (assert) => {
    const { id, email } = await UserFactory.create()
    const password = '123'
    const { body } = await supertest(BASE_URL)
      .put(`/usuarios/${id}`)
      .send({
        email,
        password,
      })
      .expect(422)
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
