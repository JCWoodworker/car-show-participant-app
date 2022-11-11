import express from 'express'
import { ShowRegistration } from "../../../models/index.js"
import ShowRegistrationSerializer from "../../../../serializers/ShowRegistrationSerializer.js"
const showRegistrationsRouter = new express.Router()

showRegistrationsRouter.get('/', async (req, res) => {
  try {
    const showRegistrations = await ShowRegistration.query()
    const serializedShowRegistrations = await Promise.all(
      showRegistrations.map(async (registration) => {
        return await ShowRegistrationSerializer.getSummary(registration)
      })
    )
    return res.status(200).json({ showRegistrations: serializedShowRegistrations })
    } catch (error) {
      return res.status(500).json({ errors: error })
    }
})

showRegistrationsRouter.post('/', async (req, res) => {
  const carId = parseInt(req.body.data.payload[0])
  const paymentType = req.body.data.payload[1]
  if (typeof(req.user) === 'undefined') {
    return res.status(401).json({ errors: 'Unauthorized.  Must be logged in to register a car' })
  } else {
    try {
      const getNextRegistrationNumber = await ShowRegistration.query().max('registrationNumber')
      const nextRegistrationNumber = getNextRegistrationNumber[0].max + 1
      const newShowRegistration = await ShowRegistration.query().insertAndFetch({ registeredCarId: carId, registrationNumber: nextRegistrationNumber, paymentType: paymentType })
      return res.status(201).json({ showRegistration: newShowRegistration })
    } catch (error) {
      return res.status(500).json({ errors: error })
    }
  }
})


export default showRegistrationsRouter
