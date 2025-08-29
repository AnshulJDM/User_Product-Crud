require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const session = require('express-session')

const app = express()
app.use(express.static("public")) 
app.use(express.json())
app.use(session({
    secret: "put_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, sameSite: 'Lax' }
}))
const PORT = 8000

app.use("/auth", require("./src/auth/routes"))
app.use("/users", require("./src/users/routes"))
app.use("/products", require("./src/products/routes"))


app.listen(PORT, async () => {
    await mongoose.connect("mongodb://localhost:27017/09_product", { autoIndex: false })
    console.log("DB connected")
    console.log("server started")
})