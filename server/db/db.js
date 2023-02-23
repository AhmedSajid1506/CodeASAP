require("dotenv").config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URL
//  || "mongodb://localhost:27017/codeasap?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = ()=>{
  mongoose.connect(mongoURI, ()=>{
    console.log("Connected to Mongo successfully");
  })
}

module.exports = connectToMongo;