import { Router } from "express";
import bcrypt from "bcrypt";
const authController = Router();
import token from "jsonwebtoken";
import {
  queryUsers,
  userValidator,
  insertUser,
  updateUser,
} from "../db/schema/users.js";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth.js";

authController.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };
  try {
    userValidator.parse({ name: name, email: email, password: password });
  } catch (error) {
    res.json({ error: error });
    return;
  }

  const verify = await queryUsers({ email: email });
  if (verify.length > 0) {
    res.status(400).send({
      error: "An account already exists with the email address provided.",
    });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(await insertUser({ name, email, password: hashedPassword }));
    res.send({
      email: email,
    });
    return;
  } catch (error) {
    res.status(400).send({ error: error });
    return;
  }
});

authController.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const users = await queryUsers({ email: email });
  if (users.length === 0) {
    res.status(400).send({
      error: "User not found",
    });
    return;
  }
  try {
    const user = users[0]
    const isValid = await bcrypt.compare(password, users[0].password!);
    if (!isValid) {
      res.status(400).send({
        error: "Contraseña incorrecta",
      });
      return;
    }
    token.sign(
      // TODO: implement token expiration
      { email: user.email, id: user.id },
      process.env.SECRET!,
      {
        expiresIn: "1440m",
      },
      (_err, token) => {
        res.status(200).send({
          token: token,
        });
        return
      }
    );
  } catch (error) {
    res.status(400).send({
      error: error,
    });
    return;
  }
});

const changePasswordValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  newPassword: z.string().min(8),
});

authController.use(authMiddleware);

authController.post("/changePassword", async (req, res, next) => {
  const { email, password, newPassword } = req.body;
  const isValid = changePasswordValidator.parse({
    email: email,
    password: password,
    newPassword: newPassword,
  });
  if (!isValid) {
    res.status(400).send({
      error: "Datos invalidos",
    });
    return;
  }
  const user = await queryUsers({ email: email });
  if (user.length === 0) {
    res.status(400).send({
      error: "Usuario no encontrado",
    });
    return;
  }
  const isValidPassword = await bcrypt.compare(password, user[0].password!);
  if (!isValidPassword) {
    res.status(400).send({
      error: "Contraseña incorrecta",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  try {
    await updateUser(user[0].id!, { ...user[0], password: hashedPassword });
    res.status(200).send({
      message: "Contraseña actualizada",
    });
  } catch (error) {
    res.status(400).send({
      error: error,
    });
    return;
  }
});

export default authController;
