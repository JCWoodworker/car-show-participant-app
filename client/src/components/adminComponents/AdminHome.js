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
  const [sortReverse, setSortReverse] = useState(false)

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

  let carInformation = adminArrays?.carAndUserData?.map((data) => {
    const key = (data.car.year * data.car.carId) + data.user.id
    return (
      <AdminShowCars
        key={key}
        user={data.user}
        car={data.car}
        registerCar={registerCar}
      />
    )
  })

  const handleSortUser = (event) => {
    const { name } = event.target
    const sortedArray = adminArrays.carAndUserData.sort((a, b) => {
      if (a.user[name] < b.user[name]) {
        return sortReverse? -1 : 1
      } else if (a.user[name] > b.user[name]) {
        return sortReverse? 1 : -1
      } else {
        return 0
      }
    })
    setSortReverse(!sortReverse)
    setAdminArrays({ ...adminArrays, carAndUserData: sortedArray })
  }

  const handleSortCar = (event) => {
    const { name } = event.target
    const sortedArray = adminArrays.carAndUserData.sort((a, b) => {
      if (a.car[name] < b.car[name]) {
        return sortReverse? 1 : -1
      } else if (a.car[name] > b.car[name]) {
        return sortReverse? -1 : 1
      } else {
        return 0
      }
    })
    setSortReverse(!sortReverse)
    setAdminArrays({ ...adminArrays, carAndUserData: sortedArray })
  }

  allUsersAndCars ? showInformation = 
    <div className="admin-cars-table">
      <table>
        <thead>
          <tr>
            <th>
              <button className="sort-button" name="firstName" onClick={handleSortUser}>
                Name
              </button>
            </th>
            <th>
              <button className="sort-button" name="year" onClick={handleSortCar}>
                Year
              </button>
              <button className="sort-button" name="make" onClick={handleSortCar}>
                Make
              </button>
              <button className="sort-button" name="model" onClick={handleSortCar}>
                Model
              </button>
            </th>
            <th>
              <button className="sort-button" name="registrationNumber" onClick={handleSortCar}>
                2023 Registration
              </button>
            </th>
            <th>Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {carInformation}
        </tbody>
      </table>
    </div> : null


  allVotes ? showInformation = adminArrays?.votes?.map((vote) => {
    return (
      <div className="votes-table" key={vote.id}>
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
      {showInformation}
    </div>
  )

}

export default AdminHome