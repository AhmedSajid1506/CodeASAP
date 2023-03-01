const multer  = require('multer');

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads/profImg/")
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + Math.round(Math.random() * 1E9) + ".png");
  }
})

const profileImg = multer({
  storage: Storage
}).single('profImg');

module.exports = profileImg;
