class CarSerializer {
  static async getSummary(car) {
    const allowedAttributes = ["id", "year", "make", "model", "userId"]

    let serializedCar = {}
    for (const attribute of allowedAttributes) {
      serializedCar[attribute] = car[attribute]
    }
    serializedCar.registered = await car.$relatedQuery("showRegistration")
    return serializedCar
  }
}
export default CarSerializer