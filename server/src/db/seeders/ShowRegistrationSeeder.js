import ShowRegistration from "../../models/ShowRegistration.js"

class ShowRegistrationSeeder {
  static async seed() {
    const showRegistrationData = [
      {
        registrationNumber: 2,
        registeredCarId: 1,
        paymentType: "Online",
        transactionId: "01faketransaction01",
        transactionTimestamp: "2021-11-12T19:34:49.000Z"
      },
      {
        registrationNumber: 4,
        registeredCarId: 2,
        paymentType: "Online",
        transactionId: "02faketransaction02",
        transactionTimestamp: "2021-11-12T19:34:49.000Z"
      },
      {
        registrationNumber: 1,
        registeredCarId: 3,
        paymentType: "Online",
        transactionId: "03faketransaction03",
        transactionTimestamp: "2021-11-12T19:34:49.000Z"
      },    
      {
        registrationNumber: 3,
        registeredCarId: 4,
        paymentType: "Cash",
        transactionId: "04faketransaction04",
        transactionTimestamp: "2021-11-12T19:34:49.000Z"
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