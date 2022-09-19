/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt")
const unique = require("objection-unique")
const Model = require("./Model")

const saltRounds = 10

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
})

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users"
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds)
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword)
  }

  static get relationMappings() {
    const Vote = require("./Vote")
    const Car = require("./Car")

    return {

      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "users.id",
          to: "votes.userId",
        },
      },
      cars: {
        relation: Model.HasManyRelation,
        modelClass: Car,
        join: {
          from: "users.id",
          to: "cars.userId",
        },
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "firstName"],

      properties: {
        email: { type: "string", format: "email" },
        firstName: { type: "string", minLength: 1, maxLength: 25 },
        cryptedPassword: { type: "string" },
      },
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json)

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword
    }

    return serializedJson
  }
}

module.exports = User
