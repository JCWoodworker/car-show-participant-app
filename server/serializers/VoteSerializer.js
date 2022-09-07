class VoteSerializer {
  static getSummary(vote) {
    const allowedAttributes = ["id", "firstPlace", "secondPlace", "thirdPlace", "userId"]

    let serializedVote = {}
    for (const attribute of allowedAttributes) {
      serializedVote[attribute] = vote[attribute]
    }
    return serializedVote
  }
}
export default VoteSerializer