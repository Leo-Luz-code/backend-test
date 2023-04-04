import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'venda_id' })
  public venda_id: number

  @column()
  public preco: string

  @column()
  public nome: string

  @column()
  public edicao: string

  @column()
  public autor: string

  @column()
  public editora: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
