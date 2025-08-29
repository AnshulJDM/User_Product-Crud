const { USER_ROLES } = require("../users/const");
const User = require("../users/model");
const { validate } = require("../users/validation");
const bcrypt = require('bcrypt');
const saltRounds = process.env.bycrypt_solt;

const register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        // const [result, msg] = validate(username, email, password)
        // if (!result) return res.json({ msg: msg })

        if (role === USER_ROLES.ADMIN) return res.status(403).json({ msg: "You cannot register as an admin" });

        const hashedPassword = bcrypt.hashSync(password, saltRounds)

        await User.create({ username, password: hashedPassword, email, roles: role });
        return res.status(201).json({ msg: "User Registered." })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error
        })
    }
}


const login = async (req, res) => {
    try {

        const { identifier, password } = req.body

        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }]
        })

        if (!user) return res.status(404).json({ msg: "user not found" })

        const isPasswordOk = bcrypt.compareSync(password, user.password)
        if (!isPasswordOk) return res.status(401).json({ msg: "password Wrong" })

        // session create
        req.session.user = { id: user._id, username: user.username }

        return res.status(200).json({ msg: "login sucessfull" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error
        })
    }

}

const logout = (req, res) => {
    try {
        req.session.destroy()
        return res.json({ msg: "logout sucessfull" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error
        })
    }

}

module.exports = { register, login, logout }