import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BadRequestException from 'App/Exceptions/BadRequestException'
import Usuario from 'App/Models/Usuario'
import CreateUsuarioValidator from 'App/Validators/CreateUsuarioValidator'
import UpdateUsuarioValidator from 'App/Validators/UpdateUsuarioValidator'

export default class UsuariosController {
  public async store({ request, response }: HttpContextContract) {
    const userPayLoad = await request.validate(CreateUsuarioValidator)

    const userByEmail = await Usuario.findBy('email', userPayLoad.email)
    if (userByEmail) throw new BadRequestException('email already in use', 409)

    const usuario = await Usuario.create(userPayLoad)
    return response.created({ usuario })
  }

  public async update({ request, response }: HttpContextContract) {
    const { email, password } = await request.validate(UpdateUsuarioValidator)
    const id = request.param('id')
    const usuario = await Usuario.findOrFail(id)

    usuario.email = email
    usuario.password = password
    await usuario.save()

    return response.ok({ usuario })
  }
}
