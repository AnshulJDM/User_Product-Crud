const multer = require('multer')
const path = require('path')



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "public", "products"))
    },
    filename: (req, file, cb) => {

        const preFix = Date.now() + "-" + Math.ceil(Math.random() * 100000)

        cb(null, preFix + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage })


module.exports = upload