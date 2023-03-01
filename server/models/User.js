const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  profImg:{
    type: String,
    required: true
  }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;