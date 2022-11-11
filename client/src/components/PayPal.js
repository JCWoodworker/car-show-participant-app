import React, { useEffect, useRef, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader"

const PayPal = ({ car, registerCar }) => {

  const [paidFor, setPaidFor] = useState(false)
  const [error, setError] = useState(null)
  const paypalRef = useRef()

  const product = {
    price: 20.00,
    name: "Car Registration",
    description: "2023 Car Show Registration"
  }

  let processPayment = () => {
  window.paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: product.description,
              amount: {
                currency_code: 'USD',
                value: product.price,
              },
            },
          ],
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture()
        setPaidFor(true)
        registerCar([car.id, "Online"])
        console.log(order)
      },
      onError: err => {
        setError(err)
        console.error(err)
      },
    })
    .render(paypalRef.current)
  }
  
  useEffect(() => {
    processPayment()
  }, [])


  if (paidFor) {
    window.setTimeout(() => {
      window.location.reload()
    }, 6000)
    return (
      <div>
        <p>Congrats, this car is registered for the show!</p>
        <p>Generating your regisration number, please wait a moment ...
          <ClipLoader color={"#123abc"} size={20} />
        </p>
      </div>
    )
  }

  return (
    <div className='paypal-button-container'>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <div className='paypal-item-description'>
        <p>{product.description} - ${product.price}</p>
      </div>
      <div ref={paypalRef} />
    </div>
  )
}

export default PayPal