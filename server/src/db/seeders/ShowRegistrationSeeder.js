import ShowRegistration from "../../models/ShowRegistration.js"

class ShowRegistrationSeeder {
  static async seed() {
    const showRegistrationData = [
      {
        registrationNumber: 2,
        registeredCarId: 1,
        paymentType: "Online",
        transactionId: "01faketransaction01"
      },
      {
        registrationNumber: 4,
        registeredCarId: 2,
        paymentType: "Online",
        transactionId: "02faketransaction02"
      },
      {
        registrationNumber: 1,
        registeredCarId: 3,
        paymentType: "Online",
        transactionId: "03faketransaction03"
      },    
      {
        registrationNumber: 3,
        registeredCarId: 4,
        paymentType: "Cash",
        transactionId: "04faketransaction04"
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