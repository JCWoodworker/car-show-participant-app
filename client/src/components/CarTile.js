import React from "react"

const CarTile = ({ car, deleteCar }) => {
  const handleClick = (event) => {
    event.preventDefault()
    deleteCar(car)
  }

  return (
    <div className="car-info">
      <p>Year: {car.year}</p>
      <p>Make: {car.make}</p>
      <p>Model: {car.model}</p>
      <button onClick={handleClick}>Delete This Car</button>
    </div>
  )
}

export default CarTile