import Vote from "../../models/Vote.js"

class VoteSeeder {
  static async seed() {
    const voteData = [
      {
        userId: 1,
        firstPlace: 1,
        secondPlace: 2,
        thirdPlace: 3,
      },
      {
        userId: 2,
        firstPlace: 2,
        secondPlace: 3,
        thirdPlace: 1,
      },
      {
        userId: 3,
        firstPlace: 3,
        secondPlace: 1,
        thirdPlace: 2,
      },
      {
        userId: 4,
        firstPlace: 1,
        secondPlace: 2,
        thirdPlace: 3,
      }
    ]

    for (const singleVote of voteData) {
      const currentVote = await Vote.query().findOne(singleVote)
      if (!currentVote) {
        await Vote.query().insert(singleVote)
      }
    }

  }
}

export default VoteSeeder