require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
// const profileImg = require("../middleware/profileImg");
const cloudinary = require("../utils/cloudinary");

// ROUTE: 1; Create a user using POST "/api/v1/auth/signup". No login required.
router.post(
  "/signup",
  [
    body("first_name", "First Name must be atleast 3 characters long").isLength({ min: 3 }),
    body("last_name", "Last Name must be atleast 3 characters long").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 6 characters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    console.log(req.body, req.file);
    // If there are errors return bad request and the errors
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the user with this email exists already.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({ success, error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      securePass = await bcrypt.hash(req.body.password, salt);

      // Upload
      const res = cloudinary.uploader.upload(profImg, {
        folder: "uploads"
      })

      user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: securePass,
        profImg: {
          public_id: result.public_id,
          url: result.secure_url
        },
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authtoken = jwt.sign(data, `${process.env.JWT_SECRET}`);
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE: 2; Authenticate a user using POST "/api/v1/auth/login". No login required.
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Please Enter Your Password").exists(),
  ],
  async (req, res) => {
    // If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ success, error: "The account you are trying to log into does not exist." });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = "falsee";
        return res.status(400).json({ success, error: "The email or password is incorrect." });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authtoken = jwt.sign(data, `${process.env.JWT_SECRET}`);
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE: 3; Get loggedin user details using POST "/api/v1/auth/getuser". login required.
router.post("/getuser", fetchuser, async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
