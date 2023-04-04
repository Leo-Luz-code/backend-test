import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'

export default class EnderecosController {
  public async store({ request, response }: HttpContextContract) {
    const { enderecoPayLoad, cpf } = request.only(['cpf', 'enderecoPayLoad'])
    const cliente = await Cliente.findByOrFail('cpf', cpf)

    const endereco = await cliente.related('endereco').create(enderecoPayLoad)
    return response.created({ endereco })
  }

  public async update({ request, response }: HttpContextContract) {
    const { enderecoPayLoad, cpf } = request.only(['cpf', 'enderecoPayLoad'])
    const cliente = await Cliente.findByOrFail('cpf', cpf)

    const endereco = await cliente.related('endereco').updateOrCreate(
      {
        cliente_id: cliente.id,
      },
      {
        rua: enderecoPayLoad.rua,
        numero: enderecoPayLoad.numero,
        complemento: enderecoPayLoad.complemento,
        bairro: enderecoPayLoad.bairro,
        cidade: enderecoPayLoad.cidade,
        pais: enderecoPayLoad.pais,
        cep: enderecoPayLoad.cep,
        estado: enderecoPayLoad.estado,
      }
    )
    return response.ok({ endereco })
  }
}
