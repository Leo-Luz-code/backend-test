import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Cliente from 'App/Models/Cliente'
import CreateClienteValidator from 'App/Validators/CreateClienteValidator'
import UpdateClienteValidator from 'App/Validators/UpdateClienteValidator'

export default class ClientesController {
  public async store({ request, response }: HttpContextContract) {
    const clientPayLoad = await request.validate(CreateClienteValidator)

    const clientByCpf = await Cliente.findBy('cpf', clientPayLoad.cpf)
    if (clientByCpf) throw new BadRequestException('cpf already in use', 409)

    const cliente = await Cliente.create(clientPayLoad)
    return response.created({ cliente })
  }

  public async update({ request, response }: HttpContextContract) {
    const { name, cpf } = await request.validate(UpdateClienteValidator)

    const id = request.param('id')
    const cliente = await Cliente.findOrFail(id)

    cliente.name = name
    cliente.cpf = cpf
    await cliente.save()

    return response.ok({ cliente })
  }

  public async index({ response }: HttpContextContract) {
    const clientes = await Cliente.query().select('*').from('clientes').orderBy('id')
    response.json(clientes)
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.only(['id'])
    const clientes = await Cliente.query().select('*').from('clientes').where('clientes.id', id)
    response.json(clientes)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.only(['id'])
    const cliente = await Cliente.findOrFail(id)

    await cliente.delete()

    return response.ok({ cliente })
  }
}
