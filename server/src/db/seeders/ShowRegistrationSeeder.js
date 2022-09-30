import ShowRegistration from "../../models/ShowRegistration.js"

class ShowRegistrationSeeder {
  static async seed() {
    const showRegistrationData = [
      {
        registrationNumber: 2,
        registeredCarId: 1,
      },
      {
        registrationNumber: 3,
        registeredCarId: 2,
      },
      {
        registrationNumber: 4,
        registeredCarId: 3,
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