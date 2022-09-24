import express from 'express'
import { User, Car, Vote } from "../../../models/index.js"

const adminRouter = new express.Router()

  adminRouter.get('/', async (req, res) => {
    if (typeof req.user === 'undefined') {
      return res.status(401).json({ errors: 'Unauthorized.  Must be logged in to view/edit your votes' })
    } else {
      const {user} = req
      if (user.isAdmin) {
        try {
            const cars = await Car.query()
            const votes = await Vote.query()
            const users = await User.query()
              return res.status(200).json({ allData: { cars, votes, users } })
        } catch (error) {
          return res.status(500).json({ errors: error })
        }
      } else {
        res.status(401).json({ errors: 'Unauthorized.  Must be an admin to view/edit this data' })
      }
    }
  })

export default adminRouter
