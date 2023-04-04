import Database from '@ioc:Adonis/Lucid/Database'
import { ClientFactory } from 'Database/factories'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Cliente', (group) => {
  test('deve criar um cliente', async (assert) => {
    const clientPayLoad = {
      name: 'Roberto',
      cpf: '07509706413',
    }

    const { body } = await supertest(BASE_URL).post('/clientes').send(clientPayLoad).expect(201)
    assert.exists(body.cliente, 'cliente indefinido')
    assert.exists(body.cliente.id, 'Id indefinido')
    assert.equal(body.cliente.cpf, clientPayLoad.cpf)
    assert.exists(body.cliente.name, 'Nome indefinido')
  })

  test('deve retornar 409 quando cpf ja estiver em uso', async (assert) => {
    const { name, cpf } = await ClientFactory.create()
    const { body } = await supertest(BASE_URL)
      .post('/clientes')
      .send({
        name,
        cpf,
      })
      .expect(409)

    console.log({ body })
    assert.exists(body.message)
    assert.include(body.message, 'cpf')
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 409)
  })

  test('deve retornar 422 quando dados necessarios nao forem recebidos', async (assert) => {
    const { body } = await supertest(BASE_URL).post('/clientes').send({}).expect(422)
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('deve retornar 422 quando o cpf for invalida', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/clientes')
      .send({ name: 'sanduiche', cpf: '456' })
      .expect(422)
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('deve atualizar o nome do cliente', async (assert) => {
    const { id, cpf } = await ClientFactory.create()
    const name = 'goiabada'

    const { body } = await supertest(BASE_URL)
      .put(`/clientes/${id}`)
      .send({
        name,
        cpf,
      })
      .expect(200)

    assert.exists(body.cliente, 'Cliente indefinido')
    assert.equal(body.cliente.name, name)
    assert.equal(body.cliente.id, id)
  })

  test('deve atualizar o cpf do cliente', async (assert) => {
    const cliente = await ClientFactory.create()
    const cpf = '07409806484'

    const { body } = await supertest(BASE_URL)
      .put(`/clientes/${cliente.id}`)
      .send({
        name: cliente.name,
        cpf,
      })
      .expect(200)

    assert.exists(body.cliente, 'Cliente indefinido')
    assert.equal(body.cliente.id, cliente.id)
  })

  test('deve retornar 422 quando dados necessarios nao forem recebidos', async (assert) => {
    const { id } = await ClientFactory.create()
    const { body } = await supertest(BASE_URL).put(`/clientes/${id}`).send({}).expect(422)
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('deve retornar 422 quando o cpf for invalido', async (assert) => {
    const { id, name } = await ClientFactory.create()
    const cpf = '789654'
    const { body } = await supertest(BASE_URL)
      .put(`/clientes/${id}`)
      .send({
        name,
        cpf,
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
