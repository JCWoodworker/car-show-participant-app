import express from 'express'
// import cleanUserInput from '../../../services/cleanUserInput.js'
import { ValidationError } from 'objection'
import VoteSerializer from "../../../../serializers/VoteSerializer.js"
import { User, Vote } from "../../../models/index.js"

const votesRouter = new express.Router()

votesRouter.get('/', async (req, res) => {
  try {
    const user = req.user.id
    const votes = await Vote.query()
      .where('userId', '=', user)
    const serializedVotes = await Promise.all(
      votes.map(async (vote) => {
        return await VoteSerializer.getSummary(vote)
      })
    )
    return res.status(200).json({ votes: serializedVotes })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default votesRouter
