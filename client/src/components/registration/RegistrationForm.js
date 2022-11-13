import React, { useState } from "react"
import FormError from "../errorHandling/FormError"
import config from "../../config"
import { Link } from "react-router-dom"

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    firstName: "",
    cellPhone: "",
    password: "",
    passwordConfirmation: "",
    isAdmin: false,
  })

  const [errors, setErrors] = useState({})

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const validateInput = (payload) => {
    setErrors({})
    const { email, firstName, password, cellPhone, passwordConfirmation } = payload
    const emailRegexp = config.validation.email.regexp
    let newErrors = {}
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      }
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      }
    }

    if (firstName.trim() == "") {
      newErrors = {
        ...newErrors,
        firstName: "First name is required",
      }
    }
    
    if ((cellPhone.trim() == "") || (cellPhone.length < 10) || (cellPhone.length > 10) || (!cellPhone.match(/^[0-9]{10}$/))) {
      newErrors = {
        ...newErrors,
        cellPhone: "Cell Phone is required, must be 10 digits, no dashes",
      }
    }
  
    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "Password confirmation is required",
      }

    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "Confirmation does not match password",
        }
      }
    }

    setErrors(newErrors)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    validateInput(userPayload)
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch("/api/v1/users", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
        const userData = await response.json()
        setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  if (shouldRedirect) {
    location.href = "/"
  }

  return (
    <div className="grid-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            First Name:
            <input 
              type="text" 
              name="firstName" 
              id="firstName" 
              value={userPayload.firstName} 
              onChange={onInputChange} />
          </label>
        </div>
        <FormError error={errors.firstName} />
        <div>
          <label>
            Cell Phone:
            <input 
              type="tel" 
              name="cellPhone"
              id="cellPhone"
              inputMode="numeric"  
              minLength={10}
              maxLength={10}
              value={userPayload.cellPhone} 
              onChange={onInputChange} />
          </label>
        </div>
        <FormError error={errors.cellPhone} />
        <div>
          <label>
            Email:
            <input 
              type="text" 
              name="email" 
              id="email"
              value={userPayload.email} 
              onChange={onInputChange} />
          </label>
        </div>
        <FormError error={errors.email} />
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              id="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
          </label>
        </div>
        <FormError error={errors.password} />
        <div>
          <label>
            Confirm Password:
            <input
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
          </label>
        </div>
        <FormError error={errors.passwordConfirmation} />
        <div className="user-registration-button-container">
          <input 
            type="submit" 
            className="user-registration-button" 
            value="Register" />
          <Link to="/">Cancel/Go Back</Link>  
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm
