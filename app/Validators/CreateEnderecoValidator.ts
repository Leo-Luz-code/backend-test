import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateEnderecoValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */

  public schema = schema.create({
    rua: schema.string({}, [rules.maxLength(64)]),
    numero: schema.string({}, [rules.regex(/(\d+)| /g)]),
    complemento: schema.string({}, [rules.maxLength(64)]),
    bairro: schema.string({}, [rules.maxLength(64)]),
    cidade: schema.string({}, [rules.maxLength(64)]),
    estado: schema.string({}, [rules.maxLength(64)]),
    pais: schema.string({}, [rules.maxLength(32)]),
    cep: schema.string({}, [rules.regex(/^([\d]{2})\.?([\d]{3})\-?([\d]{3})/)]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
