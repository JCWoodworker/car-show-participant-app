const Model = require("./Model.js")
class Car extends Model {
  static get tableName() {
    return "cars"
  }

  static get relationMappings() {
    const User = require("./User.js")
    const showRegistration = require("./ShowRegistration.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "cars.userId",
          to: "users.id"
        }
      },
      showRegistration: {
        relation: Model.HasOneRelation,
        modelClass: showRegistration,
        filter: query => query.select(["registrationNumber", "paymentType"]),
        join: {
          from: "cars.id",
          to: "showRegistrations.registeredCarId"
        }
      }
    }
  }

  static get jsonSchema() {

    return {
      type: "object",
      required: ["year", "make", "model", "userId"],
      properties: {
        firstPlace: {type: "integer"},
        secondPlace: {type: "string"},
        thirdPlace: {type: "string"},
        userId: { type: ['integer', 'string'] },
      }
    }

  }

}

module.exports = Car