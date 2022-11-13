/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('showRegistrations', (table) => {
    table.string('transactionId').notNullable().defaultTo('n/a')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table('showRegistrations', (table) => {
    table.dropColumn('transactionId')
  })
}
