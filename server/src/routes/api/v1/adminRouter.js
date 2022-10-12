import express from 'express'
import { User, Vote, ShowRegistration, Car } from "../../../models/index.js"
import ShowRegistrationSerializer from "../../../../serializers/ShowRegistrationSerializer.js"
import CarsAndUsersSerializer from '../../../../serializers/CarsAndUsersSerializer.js'

const adminRouter = new express.Router()

  adminRouter.get('/', async (req, res) => {
    if (typeof req.user === 'undefined' || req.user.isAdmin === false) {
      return res.status(401).json({ errors: 'Unauthorized.  Must log in as admin to access.' })
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
            const cars = await Car.query()
            const carAndUserData = await Promise.all(
              cars.map(async (car) => {
                return await CarsAndUsersSerializer.getSummary(car)
              })
            )
            return res.status(200).json({ carAndUserData, votes })
        } catch (error) {
          return res.status(500).json({ errors: error })
        }
      } else {
        res.status(401).json({ errors: 'Unauthorized.  Must be an admin to view/edit this data' })
      }
    }
  })

export default adminRouter
