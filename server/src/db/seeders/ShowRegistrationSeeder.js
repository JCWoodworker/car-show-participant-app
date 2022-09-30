import ShowRegistration from "../../models/ShowRegistration.js"

class ShowRegistrationSeeder {
  static async seed() {
    const showRegistrationData = [
      {
        registrationNumber: 1,
        registeredCarId: 1,
      },
      {
        registrationNumber: 2,
        registeredCarId: 2,
      },
      {
        registrationNumber: 3,
        registeredCarId: 3,
      },    
      {
        registrationNumber: 4,
        registeredCarId: 4,
      },    
      {
        registrationNumber: 5,
        registeredCarId: 5,
      },    
    ]

    for (const singleShowRegistration of showRegistrationData) {
      const currentShowRegistration = await ShowRegistration.query().findOne(singleShowRegistration)
      if (!currentShowRegistration) {
        await ShowRegistration.query().insert(singleShowRegistration)
      }
    }

  }
}

export default ShowRegistrationSeeder