class ShowRegistrationSerializer {
  static async getSummary(registration) {
    const allowedAttributes = ["id", "registeredCar", "registrationNumber"]

    let serializedShowRegistration = {}
    for (const attribute of allowedAttributes) {
      serializedShowRegistration[attribute] = registration[attribute]
    }
    serializedShowRegistration.car = await registration.$relatedQuery("car")    
    return serializedShowRegistration
  }
}
export default ShowRegistrationSerializer