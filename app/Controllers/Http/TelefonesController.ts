import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
import Telefone from 'App/Models/Telefone'

export default class TelefonesController {
  public async store({ request, response }: HttpContextContract) {
    const { telefonePayLoad, cpf } = request.only(['cpf', 'telefonePayLoad'])
    const cliente = await Cliente.findByOrFail('cpf', cpf)

    const telefones = await cliente.related('telefones').create(telefonePayLoad)
    return response.created({ telefones })
  }

  public async update({ request, response }: HttpContextContract) {
    const { telefonePayLoad, cpf } = request.only(['cpf', 'telefonePayLoad'])
    const cliente = await Cliente.findByOrFail('cpf', cpf)

    const telefone = await cliente.related('telefones').updateOrCreate(
      {
        cliente_id: cliente.id,
      },
      {
        numero: telefonePayLoad.numero,
      }
    )
    return response.ok({ telefone })
  }

  public async index({ response }: HttpContextContract) {
    const telefones = await Telefone.query().select('*').from('telefones').orderBy('id')
    response.json(telefones)
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.only(['id'])
    const telefone = await Telefone.query().select('*').from('telefones').where('telefones.id', id)
    response.json(telefone)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.only(['id'])
    const telefone = await Telefone.findOrFail(id)

    await telefone.delete()

    return response.ok({ telefone })
  }
}
