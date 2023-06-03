import { Router } from "express";
import bcrypt from "bcrypt"
const authController = Router();
import token from "jsonwebtoken";
import User, { createUser, userAcces, verifyUser } from "../models/User.js";
import { queryUsers, userValidator } from "../db/schema/user.js";

authController.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    userValidator.parse({ name: name, email: email, password: password });
  } catch (error) {
    res.json({ error: error });
    return;
  }

  const verify = await queryUsers({ email: email });
  if (verify.length > 0) {
    res.send({
      Message: "An account already exists with the email address provided.",
      Email: email,
    });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await createUser(name, email, hashedPassword);
    res.send({
      message: "Account successfully created!",
      email: email,
      username: name,
    });
    return
  } catch (error) {
    res.send({ error: error });
    return;
  }

});

authController.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const users = await queryUsers({ email: email })
  if (users.length === 0) {
    res.send({
      error: "User not found"
    })
    return;
  }

  try {
    const isValid = await bcrypt.compare(password, users[0].password!)
    res.send()
    if (!isValid) {
      res.send({
        error: "Contraseña incorrecta"
      })
    }
    token.sign({ email }, process.env.SECRET!, {
      expiresIn: "1440m"
    }, (_err, token) => {
      res.send({
        token: token
      })
    })
  } catch (error) {
    res.send({
      error: error
    })
  }
  // const user = await User.userAcces(email, password);
  // if ( user ) {
  //   res.send(`Welcome ${ email }`);
  // } else {
  //   res.send('The account does not exist')
  // }
});

authController.post("/changePassword", async (req, res, next) => {
  const { email, password, newPassword } = req.body;
  console.log(req.body);
  const user = await User.changePassword(email, password, newPassword);
  if (email !== undefined) {
    res.send("Password changed");
    console.log("Password updated");
  } else {
    console.log("Could not update password");
  }
});

export default authController;