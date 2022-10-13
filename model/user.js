import mongoose from "mongoose";

// Defining structure of document as schema
const userSchema = new mongoose.Schema({
  first_name: {
     type: String,
      required: true,
       trim: true },
  last_name: { 
    type: String,
     required: true, 
     trim: true },
  email: {
     type: String,
      required: true,
       unique:true,
       trim: true },
  password: {
     type: String,
      required: true,
       trim: true },
   mobile_number:{
     type:Number,
     required:true,
     trim:true
   }
  
})

const userModel = mongoose.model("user", userSchema)

export {userModel};