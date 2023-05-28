import { Router } from "express";
const authController = Router();
import token from "jsonwebtoken";
import User from "../models/User.js";

authController.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  //password = await User.encryptPassword( password );
  const newUser = await User.createUser(username, email, password);
  const accessToken = token.sign({ email }, process.env.SECRET!, {
    expiresIn: "1440m",
  }); 
  res.json({
    Username: username,
    Email: email,
    password: password,
    Auth: true,
    AccessToken: accessToken,
  }); 
});

authController.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.userAcces(email, password);
  console.log(user);
  if (user !== undefined) {
    res.send("Welcome");
    console.log("You are logged in to the account");
  } else {
    res
      .status(404)
      .send(
        '<img src"https://dinahosting.com/blog/upload/2021/03/error-404.jpg"/>'
      );
  }
});

authController.post("/changePassword", async (req, res, next) => {
  const { email, password, cpassword } = req.body;
  console.log(req.body);
  const user = await User.changePassword(email, password, cpassword);
  if (email !== undefined) {
    res.send("Password changed");
    console.log("Password updated");
  } else {
    console.log("Could not update password");
  }
});



export default authController;
