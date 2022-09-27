import React, { useState, useEffect } from "react"
import axios from 'axios'

const AdminHome = (props) => {
  const [adminArrays, setAdminArrays] = useState({
    registeredShowCars: [],
    votes: [],
    users: []
  })
  const [showCars, setShowCars] = useState(false)
  const [showVotes, setShowVotes] = useState(false)
  const [showUsers, setShowUsers] = useState(false)

  const fetchAllData = async () => {
      try {
        const response = await axios.get(`/api/v1/admin`)
        debugger
        const { registeredShowCars, votes, users } = response.data.allData
        debugger
        setAdminArrays({ registeredShowCars, votes, users })
      } catch(err) {
        console.log(err)
      }
    }

  useEffect(() => {
    fetchAllData()
  }, [])

  let showInformation = null
  const handleButtonClick = (event) => {
    
    if (event.target.name === "users") {
      setShowCars(false)
      setShowVotes(false)
      setShowUsers(true)
    } else if (event.target.name === "cars") {
      setShowCars(true)
      setShowVotes(false)
      setShowUsers(false)
    } else if (event.target.name === "votes") {
      setShowCars(false)
      setShowVotes(true)
      setShowUsers(false)
    }
  }

  showCars ? showInformation = adminArrays.registeredShowCars.map((car) => {
    return (
      <div key={car.id}>
        <p>{car.year} {car.make} {car.model}</p>
      </div>
    )
  }) : null

  showVotes ? showInformation = adminArrays.votes.map((vote) => {
    return (
      <div key={vote.id}>
        <p>First Place: {vote.firstPlace}</p>
        <p>Second Place: {vote.secondPlace}</p>
        <p>Third Place: {vote.thirdPlace}</p>
      </div>
    )
  }) : null

  showUsers ? showInformation = adminArrays.users.map((user) => {
    return (
      <div key={user.id}>
        <p>{user.email}</p>
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
          name="cars">
            Registered Show Cars
        </button>
        <button
          className="admin-link"
          onClick={handleButtonClick}
          name="votes">
            Votes
        </button>
        <button
          className="admin-link"
          onClick={handleButtonClick}
          name="users">
            Users
        </button>
      </div>
      {showInformation}
    </div>
  )

}

export default AdminHome