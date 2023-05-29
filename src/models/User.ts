import { pool } from "../db.js";

/**
 * This function is responsible for creating a new user.
 * @param {String} username
 * @param {String} email
 * @param {String} password
 * @returns <String[]> Returns a String Array with the information of the account created.
 */
async function createUser(username: string, email: string, password: string) {
  try {
    const query =
      "INSERT INTO usuarios (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, password];
    const result = await pool.query(query, values);
    return values.map((value) => console.log(value));
  } catch (err) {
    throw err;
  }
}

/**
 * This function allows you to check if the user exists
 * @param {String} email
 * @param {String} password
 * @returns {Boolean}
 */
export async function userAcces(email: string, password: string) {
  try {
    const query = `SELECT * FROM usuarios WHERE email='${email}' and password='${password}'`;
    const result = await pool.query(query);
    return result;
  } catch (err) {
    throw err;
  }
}

/**
 * This function is in charge of verifying if the account exists in the database.
 * @param {String} email
 * @param {Boolean} accountstatus
 */
export const verifyUser = async (email: string) => {
  try {
    const query = `SELECT * FROM usuarios WHERE email='${email}'`;
    const result = await pool.query(query);
    return result;
  } catch (error) {
    throw new Error("The user already exists");
  }
};

/**
 * This function allows the user to change the password.
 * @param {String} email
 * @param {String} password
 * @param {String} newPassword
 * @returns {String} A password status message
 */
async function changePassword(
  email: string,
  password: string,
  newPassword: string
) {
  try {
    if (password.includes(newPassword)) {
      const query = `
      UPDATE public.usuarios
      SET password= '${password}'
      WHERE email = '${email}'
      `;
      const result = await pool.query(query);
      return result;
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    throw err;
  }
}

export default {
  createUser,
  userAcces,
  changePassword,
  verifyUser,
};
