import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Cliente from './Cliente'

export default class Telefone extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero: string

  @column({ columnName: 'cliente_id' })
  public cliente_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id',
  })
  public cliente: BelongsTo<typeof Cliente>
}
