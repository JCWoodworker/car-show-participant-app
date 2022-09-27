import express from 'express'
import { User, Vote, ShowRegistration } from "../../../models/index.js"
import ShowRegistrationSerializer from "../../../../serializers/ShowRegistrationSerializer.js"

const adminRouter = new express.Router()

  adminRouter.get('/', async (req, res) => {
    if (typeof req.user === 'undefined') {
      return res.status(401).json({ errors: 'Unauthorized.  Must be logged in to view/edit your votes' })
    } else {
      const {user} = req
      if (user.isAdmin) {
        try {
            const registeredShowCars = await ShowRegistration.query()
            const serializedShowCars = await Promise.all(
              registeredShowCars.map(async (showCars) => {
                return await ShowRegistrationSerializer.getSummary(showCars)
              })
            )
            const votes = await Vote.query()
            const users = await User.query()
              return res.status(200).json({ allData: { serializedShowCars, votes, users } })
        } catch (error) {
          return res.status(500).json({ errors: error })
        }
      } else {
        res.status(401).json({ errors: 'Unauthorized.  Must be an admin to view/edit this data' })
      }
    }
  })

export default adminRouter
