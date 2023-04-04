import { BaseModel, belongsTo, BelongsTo, column, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Cliente from './Cliente'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'cliente_id' })
  public cliente_id: number

  @column()
  public rua: string

  @column()
  public numero: string

  @column()
  public complemento: string

  @column()
  public bairro: string

  @column()
  public cidade: string

  @column()
  public estado: string

  @column()
  public pais: string

  @column()
  public cep: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id',
  })
  public cliente: BelongsTo<typeof Cliente>
}
