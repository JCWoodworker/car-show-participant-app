const Model = require("./Model.js")
const unique = require("objection-unique")

const uniqueFunc = unique({
  fields: ["registeredCar"],
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
          from: "showRegistrations.registeredCar",
          to: "cars.id"
        }
      }
    }
  }

  static get jsonSchema() {

    return {
      type: "object",
      required: ["registrationNumber", "registeredCar"],
      properties: {
        registrationNumber: {type: "integer"},
        registeredCar: {type: "integer"}
      }
    }

  }

}

module.exports = ShowRegistration