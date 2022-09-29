import React, { useState, useContext } from "react"
import { userContext } from "./App"

const CarRegistrationForm = ({ addCar }) => {
  const currentUser = useContext(userContext) ? useContext(userContext) : null
  const [carPayload, setCarPayload] = useState({
    userId: currentUser.id,
    year: "",
    make: "",
    model: "",
  })
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    addCar(carPayload)
    clearForm()
    setShouldRedirect(true)
  }

  const onInputChange = (event) => {
    setCarPayload({
      ...carPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }
  
  const clearForm = () => {
    setCarPayload({
      userId: currentUser.id,
      year: "",
      make: "",
      model: "",
    })
  }

  let showForm = null
  currentUser ? (
    showForm = (
      <div className="car-registration-form">
        <h3>Add A Car</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Year
              <input type="text" name="year" value={carPayload.year} onChange={onInputChange} />
            </label>
          </div>
          <div>
            <label>
              make
              <input type="text" name="make" value={carPayload.make} onChange={onInputChange} />
            </label>
          </div>
          <div>
            <label>
              model
              <input type="text" name="model" value={carPayload.model} onChange={onInputChange} />
            </label>
          </div>
          <div>
            <input 
              type="submit"
              onClick={handleSubmit} />
          </div>
        </form>
      </div>
    )
  ) : showForm = null

  return (
    <>
      {showForm}
    </>
  )
}

export default CarRegistrationForm