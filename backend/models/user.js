const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    minlength: [6, "Password should be atleast 6 characters long"],
  },
});

UserSchema.statics.signupFunc = async function (email, password) {

  const check = await this.findOne({ email });
  if (check) {
    throw Error("This Email is already in use");
  }
  if (!validator.isEmail(email)) {
    throw Error("Enter a Valid Email");
  }
  if(password.length < 6)
  {
    throw Error("Password should be atleast 6 characters long");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const data = await this.create({ email, password: hashPassword });
  return data;
};

UserSchema.statics.loginFunc = async function (email, password) {
  const check = await this.findOne({ email });
  if (check) {
    const pass = await bcrypt.compare(password, check.password);
    if (pass) {
     return check;
    }
    throw Error("Password is incorrect");
  }
  throw Error("Email is incorrect");
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
