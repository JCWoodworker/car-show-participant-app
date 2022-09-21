import express from 'express'
// import cleanUserInput from '../../../services/cleanUserInput.js'
import { ValidationError } from 'objection'
import CarSerializer from "../../../../serializers/CarSerializer.js"
import { User, Car } from "../../../models/index.js"

const carsRouter = new express.Router()

  carsRouter.get('/', async (req, res) => {
    if (typeof req.user === 'undefined') {
      return res.status(401).json({ errors: 'Unauthorized.  Must be logged in to view/edit your votes' })
    } else {
      try {
        const user = req.user.id
        const cars = await Car.query()
          .where('userId', '=', user)
        const serializedCars = await Promise.all(
          cars.map(async (car) => {
            return await CarSerializer.getSummary(car)
          })
        )
          return res.status(200).json({ cars: serializedCars })
        } catch (error) {
          return res.status(500).json({ errors: error })
        }
    }
  })

  carsRouter.post('/', async (req, res) => {
    const { body } = req
    try {
      const newCar = await Car.query().insert(body).returning('*')
      return res.status(201).json({ car: newCar })
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(422).json({ errors: error.data })
      }
      return res.status(500).json({ errors: error })
    }
  })

export default carsRouter
