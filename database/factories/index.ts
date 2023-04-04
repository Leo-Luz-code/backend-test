import Factory from '@ioc:Adonis/Lucid/Factory'
import Cliente from 'App/Models/Cliente'
import Endereco from 'App/Models/Endereco'
import Produto from 'App/Models/Produto'
import Usuario from 'App/Models/Usuario'

export const UserFactory = Factory.define(Usuario, ({ faker }) => {
  return {
    password: faker.internet.password(),
    email: faker.internet.email(),
  }
}).build()

export const ClientFactory = Factory.define(Cliente, ({ faker }) => {
  return {
    name: faker.name.firstName(),
    cpf: '075.097.064-13',
  }
}).build()

export const AdressFactory = Factory.define(Endereco, ({ faker }) => {
  return {
    rua: faker.address.street(),
    numero: '1',
    complemento: 'ali atras',
    bairro: 'tijuca',
    cidade: faker.address.city(),
    estado: faker.address.state(),
    pais: faker.address.country(),
    cep: '40454-260',
  }
}).build()

export const ProductFactor = Factory.define(Produto, ({ faker }) => {
  return {
    preco: faker.random.numeric(),
    nome: faker.commerce.productName(),
    edicao: faker.random.numeric(),
    autor: faker.name.fullName(),
    editora: faker.name.jobArea(),
  }
}).build()
