import ShowRegistration from "../../models/ShowRegistration.js"

class ShowRegistrationSeeder {
  static async seed() {
    const showRegistrationData = [
      {
        registrationNumber: 1,
        registeredCarId: 1,
        paymentType: "online"
      },
      {
        registrationNumber: 2,
        registeredCarId: 2,
        paymentType: "online"
      },
      {
        registrationNumber: 3,
        registeredCarId: 3,
        paymentType: "online"
      },    
      {
        registrationNumber: 4,
        registeredCarId: 4,
        paymentType: "online"
      }  
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