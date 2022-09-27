/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import VoteSeeder from "./seeders/VoteSeeder.js"
import CarSeeder from "./seeders/CarSeeder.js"
import ShowRegistrationSeeder from "./seeders/ShowRegistrationSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding Users...")
    await UserSeeder.seed()

    console.log("Seeding Votes...")
    await VoteSeeder.seed()
    
    console.log("Seeding Cars...")
    await CarSeeder.seed()

    console.log("Seeding ShowRegistrations...")
    await ShowRegistrationSeeder.seed()

    console.log("Done!")
    await connection.destroy()

  }
}

export default Seeder