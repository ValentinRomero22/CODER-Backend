const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/usersImages'),
    filename: (req, file, cb) =>{
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase())
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) =>{
        const filetypes = /jpeg|jpg|gif|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));

        if(mimetype && extname) return cb(null, true)

        cb('Por favor, suba una imagen')
    }
}).single('image')

module.exports = { upload }

/* const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/usersImages'),
    filename: function(req, file, cb){
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

exports.upload = upload.single('userAvatar') */