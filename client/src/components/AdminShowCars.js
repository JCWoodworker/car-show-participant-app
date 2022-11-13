import React, { useState } from "react"

const AdminShowCars = ({ user, car, registerCar }) => {
  const [isCarRegistered, setIsCarRegistered] = useState(car.isRegisteredFor2023)

  const payCashButton = (event) => {
    registerCar([car.carId, "Cash", "n/a"])
    setIsCarRegistered(true)
  }

  let registrationInformation = "Not Registered"
  isCarRegistered? registrationInformation = 
    `#${car?.registrationNumber}` :
    "Not Registered"

  let paymentInfo = car?.paymentType
  if (!isCarRegistered) {
    paymentInfo = <button onClick={payCashButton}>Pay Cash</button>
  }

  return (
    <tr>
      <td>{user?.firstName}:</td>
      <td>{car?.year} {car?.make} {car?.model}</td>
      <td>{registrationInformation}</td>
      <td>{paymentInfo}</td>
    </tr>
  )

}

export default AdminShowCars