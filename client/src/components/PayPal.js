import React, { useEffect, useRef, useState } from 'react'

const PayPal = ({ car }) => {

  const [paidFor, setPaidFor] = useState(false)
  const [error, setError] = useState(null)
  const paypalRef = useRef()

  const product = {
    price: 20.00,
    name: "Car Registration",
    description: "2023 Michael P Stefanic Car Show Registration"
  }

  const handleRegisterClick = (event) => {
    event.preventDefault()
    registerCar(car.id)
  }

  useEffect(() => {
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
          handleRegisterClick(car.id)
          console.log(order)
        },
        onError: err => {
          setError(err)
          console.error(err)
        },
      })
      .render(paypalRef.current)
  }, [product.description, product.price])

  if (paidFor) {
    return (
      <div>
        <p>Congrats, this car is registered for the show!</p>
      </div>
    )
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <h1>
        {product.description} for ${product.price}
      </h1>
      <div ref={paypalRef} />
    </div>
  )
}

export default PayPal