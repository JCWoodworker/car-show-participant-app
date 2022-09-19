const Model = require("./Model")
class Car extends Model {
  static get tableName() {
    return "cars"
  }

  static get relationMappings() {
    const User = require("./User")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "cars.userId",
          to: "users.id"
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
        userId: {type: "integer"}
      }
    }

  }

}

module.exports = Car