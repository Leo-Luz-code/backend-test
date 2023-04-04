import Database from '@ioc:Adonis/Lucid/Database'
import { ProductFactor } from 'Database/factories'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Produto', (group) => {
  test('deve criar um produto', async (assert) => {
    const productPayLoad = {
      preco: '200',
      nome: 'test',
      edicao: '2',
      autor: 'test',
      editora: 'test',
    }
    const { body } = await supertest(BASE_URL).post('/produtos').send(productPayLoad).expect(201)
    assert.exists(body.produto, 'produto indefinido')
    assert.exists(body.produto.id, 'Id indefinido')
  })

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('deve atualizar um produto', async (assert) => {
    const { id } = await ProductFactor.create()
    const productPayLoad = {
      preco: '200',
      nome: 'test',
      edicao: '2',
      autor: 'test',
      editora: 'test',
    }

    const { body } = await supertest(BASE_URL)
      .put(`/produtos/${id}`)
      .send({
        productPayLoad,
      })
      .expect(200)

    assert.exists(body.produto, 'produto indefinido')
  })
})
