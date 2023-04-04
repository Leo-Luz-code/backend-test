import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cliente_id').unsigned().notNullable().references('id').inTable('clientes')
      table.string('cep').notNullable()
      table.string('rua').notNullable()
      table.string('numero').notNullable()
      table.string('complemento').notNullable()
      table.string('bairro').notNullable()
      table.string('cidade').notNullable()
      table.string('estado').notNullable()
      table.string('pais').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
