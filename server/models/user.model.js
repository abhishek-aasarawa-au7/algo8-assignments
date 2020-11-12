import mongoose, { Schema } from "mongoose";

// making schema
const userSchema = Schema;

// defining schema
const user = new userSchema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// creating model
const userModel = mongoose.model("user", user);

export default userModel;
