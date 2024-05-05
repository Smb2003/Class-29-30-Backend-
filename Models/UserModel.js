const mongoose = require('mongoose');

const user = mongoose.Schema({
  user_name : {
    type : String,
    unique: [true, "User exist already with this ussername"],
    required : true,
    lowercase: true
  },
  first_name : {
    type : String,
    required : true
  },
  last_name : {
    type : String,
    required : true
  },
  phone_number : {
    type : String,
    required : true,
    minLength : 11,
  },
  age : {
    type : Number,
    required : true,
    min : [18, "Minimum 18 years of age are required"],
    max : 100
  },
  email : {
    type : String,
    unique: true,
    required : true,
    lowercase: true
  },
  password : {
    type : String,
    required : true,
  }
});

const User_Schema = mongoose.model("user_Model",user);
module.exports = {User_Schema};  