import React, { useContext, useEffect, useState } from "react"
import axios from 'axios'

const CarInfo = (props) => {
  const [carData, setCarData] = useState([{
    id: "",
    year: "",
    make: "",
    model: "",
  }])

  const fetchCarData = async () => {
    try {
      const response = await axios(`/api/v1/cars`)
      setCarData(response.data.cars)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCarData()  
  }, [])

  let carInformation = null
  carData ?
    carInformation = (
      <div className="car-info">
        <p>Year: {carData[0].year}</p>
        <p>Make: {carData[0].make}</p>
        <p>Model: {carData[0].model}</p>
      </div>
    )
    : carInformation = null

  return (
    <>
      <h3>Your Car</h3>
      {carInformation}
    </>
  )
}

export default CarInfo