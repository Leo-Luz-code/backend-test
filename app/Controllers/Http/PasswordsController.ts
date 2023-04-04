import Mail from '@ioc:Adonis/Addons/Mail'
import { randomBytes } from 'crypto'
import { promisify } from 'util'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import ForgotPasswordValidator from 'App/Validators/ForgotPasswordValidator'
import { UserFactory } from 'Database/factories'
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator'
import TokenExpiredException from 'App/Exceptions/TokenExpiredException'

export default class PasswordsController {
  public async forgotPassword({ request, response }: HttpContextContract) {
    const { email, resetPasswordUrl } = await request.validate(ForgotPasswordValidator)
    const usuario = await Usuario.findByOrFail('email', email)

    const random = await promisify(randomBytes)(24)
    const token = random.toString('hex')
    await usuario.related('tokens').updateOrCreate(
      {
        user_id: usuario.id,
      },
      { token }
    )

    const resetPasswordUrlWithToken = `${resetPasswordUrl}?token=${token}`
    await Mail.send((message) => {
      message
        .from('no-reply@bemobile.com')
        .to(email)
        .subject('BeMobile: Recuperação de Senha')
        .text('Clique no link abaixo para redefinir a sua senha\n' + resetPasswordUrlWithToken)
    })
    return response.noContent()
  }

  public async resetPassword({ request, response }: HttpContextContract) {
    const { token, password } = await request.validate(ResetPasswordValidator)

    const userByToken = await Usuario.query()
      .whereHas('tokens', (query) => {
        query.where('token', token)
      })
      .preload('tokens')
      .firstOrFail()

    const tokenAge = Math.abs(userByToken.tokens[0].createdAt.diffNow('hours').hours)
    if (tokenAge > 2) {
      throw new TokenExpiredException()
    }

    userByToken.password = password
    await userByToken.save()
    await userByToken.tokens[0].delete()

    return response.noContent()
  }
}
