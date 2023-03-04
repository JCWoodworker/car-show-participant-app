import React, { useContext, useEffect, useState } from "react"
import axios from 'axios'
import CarRegistrationForm from "./CarRegistrationForm"
import CarTile from "./CarTile"

const CarIndex = (props) => {
  const [carData, setCarData] = useState([])

  const fetchCarData = async () => {
    try {
      const response = await axios(`/api/v1/cars`)
      setCarData(response.data.cars)
    } catch(err) {
      console.log(err)
    }
  }

  const addCar = async (carPayload) => {
    try {
      const response = await axios.post(`/api/v1/cars`, carPayload)
      setCarData([...carData, response.data.car])
    } catch(err) {
      console.log(err)
    }
  }

  const deleteCar = async (car) => {
    if (confirm(`Are you sure you want to delete your ${car.year} ${car.make} ${car.model}?`)) {
    try {
      const response = await axios.delete(`/api/v1/cars`, { data: {car} })
      if (!response) {
        console.log("Error deleting car")
      } else {
      const newCarData = carData?.filter(vehicle => vehicle.id !== car.id)
      setCarData(newCarData)
      }
    }
    catch(err) {
      console.log(err)
    }
    } else {
      return false
    }
  }

  const registerCar = async (payload) => {
    try {
      const response = await axios.post(`api/v1/show-registrations`, { data: {payload} })
      console.log("you registered your car")
    } catch(err) {
      console.log(`${err} - error registering car`)
    }
  }

  useEffect(() => {
    fetchCarData()  
  }, [])

  let showAllUserCars = null
  carData ? showAllUserCars = 
    carData?.map((car) => {
      return (
        <CarTile
          key={car?.id}
          car={car}
          deleteCar={deleteCar}
          registerCar={registerCar}
        />
      )
    })
  : showAllUserCars = <p>No car has been registered</p>

  let carPlurality = <h3>Your Car</h3>
  carData?.length > 1 ? carPlurality = <h3>Your Cars</h3> : carPlurality = <h3>Your Car</h3>
  let noCarMessage = null
  carData?.length === 0 ? noCarMessage = <p>No car has been registered yet!</p> : noCarMessage = null

    let carRegistration = (
      <div className="car-registration">
        <CarRegistrationForm
          addCar={addCar}
        />
      </div>
    )

  return (
    <div className="car-container">
      <div className="your-car">
        {carPlurality}
        {noCarMessage}
        <div className="all-user-cars">
          {showAllUserCars}
        </div>
      </div>
      <div className="car-registration">
        {carRegistration}
      </div>
    </div>
  )
}

export default CarIndex