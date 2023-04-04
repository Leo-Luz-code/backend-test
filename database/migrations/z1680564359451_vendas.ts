import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vendas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('quantidade').notNullable()
      table.integer('precoUnitario').notNullable()
      table.integer('precoTotal').notNullable()
      table.integer('cliente_id').unsigned().notNullable().references('id').inTable('clientes')
      table.integer('venda_id').unsigned().notNullable().references('id').inTable('produtos')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
