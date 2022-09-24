import Car from "../../models/Car.js"

class VoteSeeder {
  static async seed() {
    const carData = [
      {
        userId: 1,
        year: 1963,
        make: "Chevrolet",
        model: "Corvette",
      },
      {
        userId: 2,
        year: 1969,
        make: "Ford",
        model: "Mustang",
      },
      {
        userId: 3,
        year: 1976,
        make: "Pontiac",
        model: "Trans Am",
      },
      {
        userId: 4,
        year: 1933,
        make: "Ford",
        model: "Coupe",
      }
    ]

    for (const singleCar of carData) {
      const currentCar = await Car.query().findOne(singleCar)
      if (!currentCar) {
        await Car.query().insert(singleCar)
      }
    }

  }
}

export default VoteSeeder