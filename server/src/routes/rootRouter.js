import express from "express"

import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import votesRouter from "./api/v1/votesRouter.js"
import carsRouter from "./api/v1/carsRouter.js"
import adminRouter from "./api/v1/adminRouter.js"
import showRegistrationsRouter from "./api/v1/showRegistrationsRouter.js"

const rootRouter = new express.Router()
rootRouter.use("/", clientRouter)

rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/votes", votesRouter)
rootRouter.use("/api/v1/cars", carsRouter)
rootRouter.use("/api/v1/admin", adminRouter)
rootRouter.use("/api/v1/show-registrations", showRegistrationsRouter)

export default rootRouter
