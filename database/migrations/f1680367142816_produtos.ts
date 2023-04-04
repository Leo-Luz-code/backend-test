import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'produtos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('preco').notNullable()
      table.string('nome').notNullable().unique()
      table.integer('edicao').notNullable()
      table.string('autor').notNullable()
      table.string('editora').notNullable()
      table.integer('venda_id').unsigned().references('id').inTable('clientes')
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
