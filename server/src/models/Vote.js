const Model = require("./Model")
const unique = require("objection-unique")

const uniqueFunc = unique({ 
  fields: ["userId"], 
  identifiers: ["id"] 
})
class Vote extends uniqueFunc(Model) {
  static get tableName() {
    return "votes"
  }

  static get relationMappings() {
    const User = require("./User")

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
        userId: {type: "integer"}
      }
    }

  }

}

module.exports = Vote