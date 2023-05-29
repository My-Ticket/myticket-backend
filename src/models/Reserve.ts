//TODO: function parameters and other functionalities are yet to be implemented.
import { pool } from "../db.js";
/**
 * This function is in charge of booking a movie.
 * @param {String} title
 * @param {Date} date
 * @param {Array<Object>} seats
 */
export async function booking( title: string, date: Date, seats:[]) {
  try {
    const query = `INSERT INTO reserve (title, date, seats) VALUES ($1, $2, $3)`;
    const values = [title, date, seats];
    const result = await pool.query(query, values);
    return values.map(value => console.table({value}));
  } catch (error) {
    throw new Error('Reservation could not be made');
  }
}

export default {
  booking,
}