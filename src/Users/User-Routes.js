const express = require("express")
const user = require("./controlers")

const routes = express.Router()

// read
// 1. read All
routes.get("/", user.getAll)

// 2. read One
routes.get("/:id", user.getOne)

// update
routes.put("/:id", user.updateOne)

// delete
routes.delete("/:id", user.deleteOne)



module.exports = routes


