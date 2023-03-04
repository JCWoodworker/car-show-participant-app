import React, { useState, useContext } from "react"
import { userContext } from "../../App"
import FormError from "../../errorHandling/FormError"

const CarRegistrationForm = ({ addCar }) => {
  const currentUser = useContext(userContext) ? useContext(userContext) : null
  const [carPayload, setCarPayload] = useState({
    userId: currentUser.id,
    year: "",
    make: "",
    model: "",
  })
  const [errors, setErrors] = useState({})
  
  const validateInput = (payload) => {
    const { year, make, model } = payload
    const newErrors = {}
    if (year.trim() == "" || !year.match(/^[0-9]{4}$/)) {
      newErrors = {
        ...newErrors,
        year: "4-digit Year Required",
      }
    }
    if (make.trim() == "") {
      newErrors = {
        ...newErrors,
        make: "Make Required",
      }
    }
    if (model.trim() == "") {
      newErrors = {
        ...newErrors,
        model: "Model Required",
      }
    }
    setErrors(newErrors)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    setErrors({})
    validateInput(carPayload)
    if (Object.keys(errors).length === 0) {
      addCar(carPayload)
      clearForm()
    }
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
              Year:
              <input 
                type="number" 
                name="year"
                min="1886"
                max="2024" 
                value={carPayload.year} 
                onChange={onInputChange} 
              />
            </label>
          </div>
          <FormError error={errors.year} />
          <div>
            <label>
              Make:
              <input 
                type="text" 
                name="make" 
                value={carPayload.make} 
                onChange={onInputChange} 
              />
            </label>
          </div>
          <FormError error={errors.make} />
          <div>
            <label>
              Model:
              <input 
                type="text" 
                name="model" 
                value={carPayload.model} 
                onChange={onInputChange} 
              />
            </label>
          </div>
          <FormError error={errors.model} />
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