import React, { useContext, useEffect, useState } from "react"
import axios from 'axios'
import CarRegistrationForm from "./CarRegistrationForm"
import CarTile from "./CarTile"

const CarInfo = (props) => {
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


  useEffect(() => {
    fetchCarData()  
  }, [])

  let carInformation = null
  carData ? carInformation = 
    carData.map((car) => {
      return (
        <CarTile
          key={car.id}
          car={car}
        />
      )
    })
  : carInformation = <p>No car has been registered</p>

  let carPlurality = <h3>Your Car</h3>
  carData.length > 1 ? carPlurality = <h3>Your Cars</h3> : carPlurality = <h3>Your Car</h3>

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
        {carInformation}
      </div>
      <div className="car-registration">
        {carRegistration}
      </div>
    </div>
  )
}

export default CarInfo