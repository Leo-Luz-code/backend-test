import Database from '@ioc:Adonis/Lucid/Database'

import { ClientFactory } from 'Database/factories'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Endereco', (group) => {
  test('deve criar um endereco em um cliente', async (assert) => {
    const cliente = await ClientFactory.create()
    const cpf = cliente.cpf

    const enderecoPayLoad = {
      rua: 'patagonia',
      numero: '123',
      complemento: 'ali atras',
      bairro: 'tijuca',
      cidade: 'dinamarca',
      estado: 'gasoso',
      pais: 'veneza',
      cep: '41210-000',
    }

    const { body } = await supertest(BASE_URL)
      .post('/enderecos')
      .send({ enderecoPayLoad, cpf })
      .expect(201)

    const endereco = await cliente.related('endereco').query()
    console.log(cliente)
    console.log(endereco[0])
    assert.exists(body.endereco, 'endereco indefinido')
  })

  test('deve atualizar um endereco', async (assert) => {
    const cliente = await ClientFactory.create()
    const cpf = cliente.cpf

    const endereco = {
      rua: 'patagonia',
      numero: '123',
      complemento: 'ali atras',
      bairro: 'tijuca',
      cidade: 'dinamarca',
      estado: 'gasoso',
      pais: 'veneza',
      cep: '41210-000',
    }

    const enderecoPayLoad = {
      rua: 'quente',
      numero: '123',
      complemento: 'ali atras',
      bairro: 'tijuca',
      cidade: 'dinamarca',
      estado: 'gasoso',
      pais: 'veneza',
      cep: '41210-000',
    }

    const adress = await cliente.related('endereco').create(endereco)
    const clientAdress = await cliente.related('endereco').query()
    console.log(clientAdress)

    const { body } = await supertest(BASE_URL)
      .put(`/enderecos/${adress.id}`)
      .send({ enderecoPayLoad, cpf })
      .expect(200)

    const newAdress = await cliente.related('endereco').query()
    //console.log(newAdress[0])
    assert.exists(body.endereco)
  })

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
