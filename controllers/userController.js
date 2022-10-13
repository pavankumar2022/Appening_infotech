import { userModel } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class userController {
  static signup = async (req, res) => {
    const { first_name, last_name, email, password, confirm_password ,mobile_number} = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "Email already exist" });
    } else {
      if (first_name && last_name && email && password && confirm_password && mobile_number) {
        if (password === confirm_password) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const userData = new userModel({
              first_name: first_name,
              last_name: last_name,
              email: email,
              password: hashPassword,
              mobile_number:mobile_number
            });
            await userData.save();
            const saved_user = await userModel.findOne({ email: email });
            // Generate JWT Token
            const token = jwt.sign(
              { userID: saved_user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "2d" }
            );
            res.status(201)
              .send({
                status: "success",
                message: "user Successfully signup",
                token: token,
              });
          } catch (error) {
            console.log(error);
            res.send({ status: "failed", message: "Unable to signup" });
          }
        } else {
          res.send({ status: "failed", message: "Password  doesn't match" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await userModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            // Generate JWT Token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "2d" }
            );
            res.send({
              status: "success",
              message: "user successfully login!!!",
              token: token ,
              userDetail:user
            });
          } else {
            res.send({
              status: "failed",
              message: "Email or Password is not Valid",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not a valid User",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Login" });
    }
  };

}

export default userController;
