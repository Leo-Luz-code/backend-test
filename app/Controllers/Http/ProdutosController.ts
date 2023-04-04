import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BadRequestException from 'App/Exceptions/BadRequestException'
import Produto from 'App/Models/Produto'
import ProdutoValidator from 'App/Validators/ProdutoValidator'

export default class ProdutosController {
  public async store({ request, response }: HttpContextContract) {
    const produtctPayLoad = await request.validate(ProdutoValidator)

    const productByName = await Produto.findBy('nome', produtctPayLoad.nome)
    if (productByName) throw new BadRequestException('name already in use', 409)

    const produto = await Produto.create(produtctPayLoad)
    return response.created({ produto })
  }

  public async update({ request, response }: HttpContextContract) {
    const { preco, nome, edicao, autor, editora } = request.only([
      'preco',
      'nome',
      'edicao',
      'autor',
      'editora',
    ])

    const id = request.param('id')
    const produto = await Produto.findOrFail(id)

    produto.preco = preco
    produto.nome = nome
    produto.edicao = edicao
    produto.autor = autor
    produto.editora = editora

    await produto.save()

    return response.ok({ produto })
  }

  public async index({ response }: HttpContextContract) {
    const produtos = await Produto.query().select('*').from('produtos').orderBy('id')
    response.json(produtos)
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.only(['id'])
    const produto = await Produto.query().select('*').from('produtos').where('produtos.id', id)
    response.json(produto)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.only(['id'])
    const produto = await Produto.findOrFail(id)

    await produto.delete()

    return response.ok({ produto })
  }
}
