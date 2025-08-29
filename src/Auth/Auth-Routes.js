const express = require("express")
const user = require("./controlers")

const routes = express.Router()

routes.post("/register", user.register)
routes.post("/login", user.login)
routes.post("/logout", user.logout)

module.exports = routes