const User = require("../Users/User-Model")
const Product = require("./model")

const getAll = async (req, res) => {
    try {
        const products = await Product.find().populate("user", "-password -__v")

        return res.status(200).json({
            data: products
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error
        })
    }
}

const getData = (req, res) => {

    console.log(req.cookies.count)

    res.json({
        msg: "coockie info"
    })
}

const getOne = async (req, res) => {

    try {
        const id = req.params["id"]
        const product = await Product.findOne({ _id: id })
        if (!product) return res.status(404).json({ msg: "product not found" })
        return res.status(200).json({ data: product })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error
        })
    }
}

const createOne = async (req, res) => {
    try {

        console.log("req.body : ", req.body)
        console.log("req.file : ", req.file)

        let file = ""
        if (req.file?.filename) {
            file = req.file.filename
        }

        const user_id = req.user.id
        const user = await User.findById(user_id)

        const { name, price, desc, catagory, discount_data, color } = req.body;
        if (!name || !price || !catagory) return res.status(400).json({ msg: "data require" })
        const product = await Product.create({ name, price, desc, catagory, discount_data, color, user: user_id, image: file })
        user.products.push(product._id)
        await user.save()
        return res.status(201).json({ msg: "Product Created." })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error
        })
    }
}

const updateOne = async (req, res) => {
    try {
        const id = req.params["id"]
        const product = await Product.findById(id)
        if (!product) return res.status(404).json({ msg: "product not found" })
        const { username, password, contectNo, email } = req.body;

        await Product.findOneAndUpdate({ _id: id }, { username, password, contectNo, email })

        return res.status(200).json({ msg: "product updated successfuly" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error
        })
    }

}

const deleteOne = async (req, res) => {
    try {
        const id = req.params["id"]
        const product = await Product.findById(id)
        if (!product) return res.status(404).json({ msg: "product not found" })

        await Product.findByIdAndDelete(id)

        res.status(200).json({ msg: `User Deleted Successfuly` })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error
        })
    }
}

module.exports = { getAll, getOne, createOne, deleteOne, updateOne, getData }