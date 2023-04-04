import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Cliente from './Cliente'
import Produto from './Produto'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'cliente_id' })
  public cliente_id: number

  @column()
  public quantidade: number

  @column()
  public precoUnitario: number

  @column()
  public precoTotal: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id',
  })
  public cliente: BelongsTo<typeof Cliente>

  @hasMany(() => Produto, {
    foreignKey: 'venda_id',
  })
  public produtos: HasMany<typeof Produto>
}
