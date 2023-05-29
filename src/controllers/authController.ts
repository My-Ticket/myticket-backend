import { Router } from "express";
const authController = Router();
import token from "jsonwebtoken";
import User, { createUser, userAcces, verifyUser } from "../models/User.js";

authController.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  const accessToken = token.sign({ email }, process.env.SECRET!, {
    expiresIn: "1440m",
  });
  const verify = await verifyUser( email );
  if ( verify ) {
    res.send( {
      Message: 'An account already exists with the email address provided.',
      Email: email,
    } )
  } else {
    res.send({
      Message: 'Account successfully created!',
      Email: email,
      Username: username,
      AccessToken: accessToken
    });
    const user = await createUser( username, email, password );
  }
});

authController.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.userAcces(email, password);
  if ( user ) {
    res.send(`Welcome ${ email }`);
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
