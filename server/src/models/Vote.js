const Model = require("./Model.js")
class Vote extends Model {
  static get tableName() {
    return "votes"
  }

  static get relationMappings() {
    const User = require("./User.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "votes.userId",
          to: "users.id"
        }
      }
    }

  }

  static get jsonSchema() {

    return {
      type: "object",
      required: ["firstPlace", "secondPlace", "thirdPlace", "userId"],
      properties: {
        firstPlace: {type: "integer"},
        secondPlace: {type: "integer"},
        thirdPlace: {type: "integer"},
        userId: { type: ['integer', 'string'] },
      }
    }

  }

}

module.exports = Vote