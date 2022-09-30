const tableName = "showRegistrations"

/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const tableExists = await knex.schema.hasTable(tableName)

  if (!tableExists) {
    console.log(`Creating ${tableName}`)
    return knex.schema.createTable(tableName, (table) => {
      table.bigIncrements("id")
      table.integer("registrationNumber")
        .notNullable()
      table.bigInteger("registeredCarId")
        .unique()
        .notNullable()
        .unsigned()
        .index()
        .references("cars.id")
        .onDelete("CASCADE")
      table.timestamp("createdAt")
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp("updatedAt")
        .notNullable()
        .defaultTo(knex.fn.now())
    })
  }

}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  console.log(`Rolling back ${tableName}`)
  return knex.schema.dropTableIfExists(tableName)
}
