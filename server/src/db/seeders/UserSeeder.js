import User from "../../models/User.js"

class UserSeeder {
  static async seed() {
    const userData = [
      {
        email: "user1@test.com",
        firstName: "User1",
        cryptedPassword: "$2b$10$1mZuD.3ac8rDukajr54TzeyQXriKC7berLu/nOuu4MKzQ10heRfn6",
        isAdmin: false
      },
      {
        email: "user2@test.com",
        firstName: "User2",
        cryptedPassword: "$2b$10$1mZuD.3ac8rDukajr54TzeyQXriKC7berLu/nOuu4MKzQ10heRfn6",
        isAdmin: false
      },
      {
        email: "user3@test.com",
        firstName: "User3",
        cryptedPassword: "$2b$10$1mZuD.3ac8rDukajr54TzeyQXriKC7berLu/nOuu4MKzQ10heRfn6",
        isAdmin: false
      },
      {
        email: "admin@test.com",
        firstName: "administrator",
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