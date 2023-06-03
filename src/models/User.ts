import { insertUser } from "../db/schema/user.js";

/**
 * This function is responsible for creating a new user.
 * @param {String} username
 * @param {String} email
 * @param {String} password
 * @returns {Array <String>} Returns a String Array with the information of the account created.
 */
export async function createUser(username: string, email: string, password: string) {
  try {
    await insertUser({ name: username, email: email, password: password }); 
  } catch (err) {
    throw err;
  }
}

/**
 * This function allows access to the account
 * @param {String} email
 * @param {String} password
 * @returns {Boolean}
 */
export async function userAcces(email: string, password: string) {
  try {
    // TODO: Refactor this query
    // const query = `SELECT * FROM usuarios WHERE email='${email}' and password='${password}'`;
    // const result = await db.query(query);
    // return result.length > 0 ? true : false;
  } catch (err) {
    throw err;
  }
}
/**
 * This function is in charge of verifying if the user exists.
 * @param {String} email
 * @returns {Boolean} status
 */
export async function verifyUser( email: string ) {
  try {
    // TODO: Refactor this query
    // const query = `SELECT * FROM usuarios WHERE email='${email}'`;
    // const result = await db.query(query);
    // return result.length > 0 ? true : false;
  } catch (error){
    throw error;
  }
}

/**
 * This function allows the user to change the password.
 * @param {String} email
 * @param {String} password
 * @param {String} newPassword
 * @returns {String}
 */
export async function changePassword(
  email: string,
  password: string,
  newPassword: string
) {
  try {
    if (password.includes(newPassword)) {
      // TODO: Refactor this query
      // const query = `
      // UPDATE public.usuarios
      // SET password= '${password}'
      // WHERE email = '${email}'
      // `;
      // const result = await db.query(query);
      // return result;
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
