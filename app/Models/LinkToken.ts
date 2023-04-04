import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Usuario from './Usuario'

export default class LinkToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public token: string

  @column({ columnName: 'user_id' })
  public user_id: number

  @belongsTo(() => Usuario, {
    foreignKey: 'user_id',
  })
  public usuario: BelongsTo<typeof Usuario>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
