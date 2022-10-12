import React, { useState, useEffect } from "react"
import axios from 'axios'
import AdminShowCars from "./AdminShowCars"

const AdminHome = (props) => {
  const [adminArrays, setAdminArrays] = useState({
    usersAndCars: [],
    votes: [],
  })
  const [allUsersAndCars, setAllUsersAndCars] = useState(false)
  const [allVotes, setAllVotes] = useState(false)
  const [newCarRegistered, setNewCarRegistered] = useState(false)

  const fetchAllData = async () => {
      try {
        const response = await axios.get(`/api/v1/admin`)
        const { carAndUserData, votes } = response.data
        setAdminArrays({ carAndUserData, votes })
        setNewCarRegistered(false)
      } catch(err) {
        console.log(err)
      }
    }
  
  const registerCar = async (payload) => {
    try {
      const response = await axios.post(`api/v1/show-registrations`, { data: {payload} })
      console.log("you registered your car")
      setNewCarRegistered(true)
    } catch(err) {
      console.log(`${err} - error registering car`)
    }
  }
  
  useEffect(() => {
    fetchAllData()
  }, [newCarRegistered])

  let showInformation = null
  const handleButtonClick = (event) => {
    
    if (event.target.name === "usersAndCars") {
      setAllUsersAndCars(true)
      setAllVotes(false)
    } else if (event.target.name === "votes") {
      setAllUsersAndCars(false)
      setAllVotes(true)
    }
  }

  allUsersAndCars ? showInformation = adminArrays?.carAndUserData?.map((data) => {
    return (
      <AdminShowCars
        key={data.user.id}
        user={data.user}
        car={data.car}
        registerCar={registerCar}
      />
    )
  }) : null

  allVotes ? showInformation = adminArrays?.votes?.map((vote) => {
    return (
      <div key={vote.id}>
        <p>First Place: {vote.firstPlace}</p>
        <p>Second Place: {vote.secondPlace}</p>
        <p>Third Place: {vote.thirdPlace}</p>
      </div>
    )
  }) : null

  return (
    <div className="admin-home-container">
      <h1>Admin Home</h1>
      <div className="admin-links-container">
        <button 
          className="admin-link" 
          onClick={handleButtonClick}
          name="usersAndCars">
            All Users And Cars
        </button>
        <button
          className="admin-link"
          onClick={handleButtonClick}
          name="votes">
            Votes
        </button>
      </div>
      <div className="admin-cars-container">
      {showInformation}
      </div>
    </div>
  )

}

export default AdminHome