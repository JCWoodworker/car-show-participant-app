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
      const newCar = response.data.car
      setCarData([...carData, newCar])
    } catch(err) {
      console.log(err)
    }
  }

  const deleteCar = async (car) => {
    console.log(car)
    confirm(`Are you sure you want to delete your ${car.year} ${car.make} ${car.model}?`)
    try {
      const response = await axios.delete(`/api/v1/cars`, { data: {car} })
      if (!response) {
        console.log("Error deleting car")
      } else {
      const newCarData = carData.filter(vehicle => vehicle.id !== car.id)
      alert(`Your ${car.year} ${car.make} ${car.model} has been deleted.`)
      setCarData(newCarData)
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCarData()  
  }, [])

  let allUserCars = null
  carData ? allUserCars = 
    carData.map((car) => {
      return (
        <CarTile
          key={car.id}
          car={car}
          deleteCar={deleteCar}
        />
      )
    })
  : allUserCars = <p>No car has been registered</p>

  let carPlurality = <h3>Your Car</h3>
  carData.length > 1 ? carPlurality = <h3>Your Cars</h3> : carPlurality = <h3>Your Car</h3>
  let noCarMessage = null
  carData.length === 0 ? noCarMessage = <p>No car has been registered yet!</p> : noCarMessage = null

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
          {allUserCars}
        </div>
      </div>
      <div className="car-registration">
        {carRegistration}
      </div>
    </div>
  )
}

export default CarIndex