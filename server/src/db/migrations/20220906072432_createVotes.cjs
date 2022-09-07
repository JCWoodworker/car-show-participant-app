const tableName = "votes"

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
      table.integer("firstPlace").notNullable()
      table.integer("secondPlace").notNullable()
      table.integer("thirdPlace").notNullable()
      table.bigInteger("userId")
        .notNullable()
        .unsigned()
        .index()
        .references("users.id")
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
