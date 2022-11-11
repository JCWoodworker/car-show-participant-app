import React, { useState } from "react"

const AdminShowCars = ({ user, car, registerCar }) => {
  const [isCarRegistered, setIsCarRegistered] = useState(car.isRegisteredFor2023)

  const payCashButton = (event) => {
    registerCar([car.carId, "Cash"])
    setIsCarRegistered(true)
  }

  let registrationInformation = (
    <>
      <p>Not Registered For 2023 Show</p>
      <button onClick={payCashButton}>Register As Cash</button>
    </>
  )
  if (isCarRegistered) {
    registrationInformation = <p className="reg-info">Registered For 2023 - $$ {car.paymentType}: #{car.registrationNumber}</p>
  }

  return (
    <div className="adminCarListTile">
      <h4>{user.firstName}:</h4>
      <p>{car.year} {car.make} {car.model}</p>
      {registrationInformation}
    </div>
  )

}

export default AdminShowCars