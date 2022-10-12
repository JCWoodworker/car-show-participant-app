const Model = require("./Model.js")
const unique = require("objection-unique")

const uniqueFunc = unique({
  fields: ["registeredCarId"],
  identifiers: ["id"],
})

class ShowRegistration extends uniqueFunc(Model) {
  static get tableName() {
    return "showRegistrations"
  }

  static get relationMappings() {
    const Car = require("./Car.js")

    return {
      car: {
        relation: Model.BelongsToOneRelation,
        modelClass: Car,
        join: {
          from: "showRegistrations.registeredCarId",
          to: "cars.id"
        }
      }
    }
  }

  static get jsonSchema() {

    return {
      type: "object",
      required: ["registrationNumber", "registeredCarId", "paymentType"],
      properties: {
        registrationNumber: {type: "integer"},
        registeredCarId: {type: "integer"},
        paymentType: {type: "string"}
      }
    }

  }

}

module.exports = ShowRegistration