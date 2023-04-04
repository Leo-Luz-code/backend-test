import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'

export default class VendasController {
  public async store({ request, response }: HttpContextContract) {
    const { vendaPayLoad, cpf, produtoPayLoad } = request.only([
      'cpf',
      'vendaPayLoad',
      'produtoPayLoad',
    ])
    const cliente = await Cliente.findByOrFail('cpf', cpf)

    const venda = await cliente.related('vendas').create(vendaPayLoad)
    const produto = await venda.related('produtos').create(produtoPayLoad)
    return response.created({ venda, produto })
  }
}
