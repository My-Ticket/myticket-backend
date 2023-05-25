import { Router } from "express";
const authController = Router();

import User from "../models/User.js";

import token from "jsonwebtoken";

const register = authController.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  //password = await User.encryptPassword( password );
  const newUser = await User.userCreate(username, email, password); //Database response
  const accessToken = token.sign({ email }, process.env.SECRET!, {
    expiresIn: "1440m",
  }); //Access Token
  res.json({
    Username: username,
    Email: email,
    password: password,
    Auth: true,
    AccessToken: accessToken,
  }); //Server response
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

export default authController;
