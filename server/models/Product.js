const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title:{
    type: String,
    required: true
  },
  thumbnail:{
    type: String,
    required: true
  },
  webpage:{
    type: String,
    required: true
  },
  downloadlinks:{
    type: String,
    required: true
  },
  category:[
    String,
    {required: true}
  ],
  tags: [
    String,
    {required: true}
  ],
  date:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('product', ProductSchema);