import React from "react"

const CarTile = ({ car }) => {
  return (
    <div className="car-info">
      <p>Year: {car.year}</p>
      <p>Make: {car.make}</p>
      <p>Model: {car.model}</p>
    </div>
  )
}

export default CarTile