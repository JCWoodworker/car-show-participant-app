/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import VoteSeeder from "./seeders/VoteSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding Users...")
    await UserSeeder.seed()

    console.log("Seeding Votes...")
    await VoteSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder