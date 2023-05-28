import { Router } from "express";
const authController = Router();

import User from "../models/User.js";
import bk from "../models/Reserve.js";
import token from "jsonwebtoken";

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
  const user = await User.verifyUser(email, password);
  console.log(user);
  if (user !== undefined) {
    res.send("Welcome");
    console.log("Usuario encontrado!");
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

authController.get("/profile", (req, res, next) => {
  const tokenheader = req.headers["x-access-token"] as string;
  if (!tokenheader) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }

  try {
    token.verify(tokenheader, process.env.SECRET!);
    res.json("Dashboard");
    console.log("decoded");
  } catch (error) {}
});


authController.get("/reserve", async (req, res, next) => {
  const tokenheader = req.headers["x-access-token"] as string;
  const {title, date, seats} = req.body;
  if (!tokenheader) {
    return res.status(401).json({
      auth:false,
      message: "No valid token",
    })
  }
    try {
      const reserve = await bk.booking( title, date, seats);
    } catch (error) {
      throw new Error('Reservation could not be made');
    }
});


export default authController;
