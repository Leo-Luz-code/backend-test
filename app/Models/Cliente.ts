import { BaseModel, column, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Endereco from './Endereco'
import Telefone from './Telefone'
import Venda from './Venda'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public cpf: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Telefone, {
    foreignKey: 'cliente_id',
  })
  public telefones: HasMany<typeof Telefone>

  @hasOne(() => Endereco, {
    foreignKey: 'cliente_id',
  })
  public endereco: HasOne<typeof Endereco>

  @hasMany(() => Venda, {
    foreignKey: 'cliente_id',
  })
  public vendas: HasMany<typeof Venda>
}
