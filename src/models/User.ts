/**
 * This function is responsible for creating a new user.
 * @param {String} username
 * @param {String} email
 * @param {String} password 
 * @returns <String[]> Returns a String Array with the information of the account created.
 */
async function createUser(name: string, email: string, password: string) {
  try {
    const query =
      "INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3)";
    const values = [name, email, password];
    const result = await db.query(query, values);
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
async function verifyUser(email: string, password: string) {
  try {
    const query = `SELECT * FROM usuarios WHERE email='${email}' and password='${password}'`;
    const result = await db.query(query);
    return result.length > 0 ? true : false;
  } catch (err) {
    return undefined;
    throw err;
  }
}

/**
 * This function allows the user to change the password.
 * @param {String} email
 * @param {String} password
 * @param {String} newPassword
 * @returns <String> A password status message
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
      const result = await db.query(query);
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
  verifyUser,
  changePassword,
};
