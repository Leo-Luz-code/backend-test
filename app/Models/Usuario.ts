import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import LinkToken from './LinkToken'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => LinkToken, {
    foreignKey: 'user_id',
  })
  public tokens: HasMany<typeof LinkToken>

  @beforeSave()
  public static async hashPassword(usuario: Usuario) {
    if (usuario.$dirty.password) usuario.password = await Hash.make(usuario.password)
  }
}
