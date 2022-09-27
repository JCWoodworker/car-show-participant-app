import React from "react"

const CarTile = ({ car, deleteCar, registerCar }) => {
  const handleDeleteClick = (event) => {
    event.preventDefault()
    deleteCar(car)
  }

  const handleRegisterClick = (event) => {
    event.preventDefault()
    registerCar(car.id)
  }

  return (
    <div className="car-info">
      <p>Year: {car.year}</p>
      <p>Make: {car.make}</p>
      <p>Model: {car.model}</p>
      <button onClick={handleDeleteClick}>Delete This Car</button>
      <button onClick={handleRegisterClick}>Register This Car For The 2023 Show</button>
    </div>
  )
}

export default CarTile