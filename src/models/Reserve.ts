/**
 * 
 * @param {String} title
 * @param {Number} ticket
 * @param {Array<Object>}
 * @param {String} userID 
 * @returns {Array<Object>}
 */
//TODO: add support for seat object
export async function booking(
  userID: string,
  title: string,
  ticket: number,
  seats: []
) {
  try {
    // TODO: Refactor this query
    // const query = `INSERT INTO public.booking(
    //   id, title, tickets, seats)
    //   VALUES ($1, $2, $3, ARRAY[$4]::json[]);`;
    // const values = [userID, title, ticket, JSON.stringify(seats)];
    // const result = await db.query(query, values);
    // return result;
  } catch (error) {
    throw error;
  }
}

export default {
  booking,
};
