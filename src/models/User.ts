import bcrypt from "bcrypt";

//Esta funcion se encarga de crear el usuario y conectarse a la base de datos
async function userCreate(name: string, email: string, password: string) {
    try {
      const query = 'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3)';
      const values = [name, email, password];
      const result = await db.query(query, values);
      return values.map(value => console.log(value));
    } catch ( err ) {
      throw err;
    }
  }
//Se encarga de buscar en la base de datos si el usuario existe
async function verifyUser( email: string, password: string ) {
    try{
        const query = `SELECT * FROM usuarios WHERE email='${email}' and password='${password}'`
        const result = await db.query(query);
        return result
    } catch ( err ) {
      return undefined;  
      throw err;
    }
}

export default {
    userCreate,
    verifyUser,
}