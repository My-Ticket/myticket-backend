import { Router } from "express";
const authController = Router();
import token from "jsonwebtoken";
import User, { userAcces, verifyUser } from "../models/User.js";

authController.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  const accessToken = token.sign({ email }, process.env.SECRET!, {
    expiresIn: "1440m",
  });
  let check = false;
  const verify = await verifyUser( email ).then(e => e.rowCount > 0 ? check = true : check = false);
  if ( check ) {
    res.send( {
      Auth: false,
      Message: 'The email you provided has already been used in another account!'
    } )
  } else {
    res.send({
      Auth: true,
      Email: email,
      Username: username,
      Message: 'Account successfully created!',
      accessToken: accessToken,
    })
    const user = await User.createUser( username, email, password );
  }
});

authController.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  let access = false;
  const user = await User.userAcces(email, password).then( e => e.rows.length > 0 ? access = true : access);
  if ( access ) {
    res.send('Welcome');
  } else {
    res.send('The account does not exist')
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
