class CarSerializer {
  static getSummary(car) {
    const allowedAttributes = ["id", "year", "make", "model", "userId"]

    let serializedCar = {}
    for (const attribute of allowedAttributes) {
      serializedCar[attribute] = car[attribute]
    }
    // const isCarRegistered = serializedCar.$relatedQuery("showRegistrations")
    // debugger
    return serializedCar
  }
}
export default CarSerializer