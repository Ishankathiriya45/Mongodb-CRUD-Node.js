const multer = require("multer");
const path = require('path')

const fileFilter = (req, file, cb) => {
    let allowedFileType = [];
    switch (file.fieldname) {
        case 'productImg':
            allowedFileType = [
                ".jpg",
                ".png",
                ".jpeg",
                ".jfif",
            ]
            break;
        default:
            allowedFileType = []
            break;
    }
    const extname = path.extname(file.originalname)

    if (allowedFileType.includes(extname)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const imgStore = multer.diskStorage({
    destination: function (req, file, cb) {
        switch (file.fieldname) {
            case 'productImg':
                cb(null, 'public/product')
                break;
            default:
                cb(null, 'public/common')
                break;
        }
    },

    filename: function (req, file, cb) {
        const getFile = () => {
            return Date.now() +
                "-" +
                path.basename(file.originalname, path.extname(file.originalname))
                    .replace(/ /g, "_") +
                path.extname(file.originalname)
        }
        switch (file.fieldname) {
            case 'productImg':
                cb(null, getFile())
                break;
            default:
                cb(null, getFile())
                break;
        }
    }
})

const upload = multer({ storage: imgStore, fileFilter: fileFilter })

module.exports = upload;