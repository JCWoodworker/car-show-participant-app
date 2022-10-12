class CarsAndUsersSerializer {
  static async getSummary(car) {
    const allowedCarAttributes = ["id", "userId", "year", "make", "model"]
    let serializedCarAndUser = {}

    for (const attribute of allowedCarAttributes) {
      serializedCarAndUser[attribute] = car[attribute]
    }

    
    serializedCarAndUser.show = await car.$relatedQuery("showRegistration")
    serializedCarAndUser.user = await car.$relatedQuery("user")
    
    const userAndCarData = {
      user: {
        id: serializedCarAndUser.user.id,
        firstName: serializedCarAndUser.user.firstName,
        email: serializedCarAndUser.user.email,
        cellPhone: serializedCarAndUser.user.cellPhone,
      },
      car: {
        carId: serializedCarAndUser.id,
        year: serializedCarAndUser.year,
        make: serializedCarAndUser.make,
        model: serializedCarAndUser.model,
      }
    }
    
    if (serializedCarAndUser.show) {
      userAndCarData.car.isRegisteredFor2023 = true
      userAndCarData.car.registrationNumber = serializedCarAndUser.show.registrationNumber
      userAndCarData.car.paymentType = serializedCarAndUser.show.paymentType
    } else {
      userAndCarData.car.isRegisteredFor2023 = false
      userAndCarData.car.registrationNumber = null
      userAndCarData.car.paymentType = null
    }

    return userAndCarData
  }

}

export default CarsAndUsersSerializer