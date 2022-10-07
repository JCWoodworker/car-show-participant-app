import User from "../../models/User.js"

class UserSeeder {
  static async seed() {
    const userData = [
      {
        email: "michael@stefanik.com",
        firstName: "Michael",
        cellPhone: "5555555555",
        cryptedPassword: "$2b$10$D2RS6lFExe7WpZpNi0D44u/ESYXOlDoOlV5nBN..mcM8DmzP6hV7G",
        isAdmin: false
      },
      {
        email: "user1@test.com",
        firstName: "User1",
        cellPhone: "5555555555",
        cryptedPassword: "$2b$10$1mZuD.3ac8rDukajr54TzeyQXriKC7berLu/nOuu4MKzQ10heRfn6",
        isAdmin: false
      },
      {
        email: "user2@test.com",
        firstName: "User2",
        cellPhone: "5555555555",
        cryptedPassword: "$2b$10$1mZuD.3ac8rDukajr54TzeyQXriKC7berLu/nOuu4MKzQ10heRfn6",
        isAdmin: false
      },
      {
        email: "user3@test.com",
        firstName: "User3",
        cellPhone: "5555555555",
        cryptedPassword: "$2b$10$1mZuD.3ac8rDukajr54TzeyQXriKC7berLu/nOuu4MKzQ10heRfn6",
        isAdmin: false
      },
      {
        email: "admin@test.com",
        firstName: "administrator",
        cellPhone: "5555555555",
        cryptedPassword: "$2b$10$1mZuD.3ac8rDukajr54TzeyQXriKC7berLu/nOuu4MKzQ10heRfn6",
        isAdmin: true,
      }
    ]

    for (const singleUser of userData) {
      const currentUser = await User.query().findOne(singleUser)
      if (!currentUser) {
        await User.query().insert(singleUser)
      }
    }

  }

}

export default UserSeeder