const axios = require('axios');
const options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/title/find',
  params: {q: 'The Witcher'},
  headers: {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': process.env.API_HOST
  }
};

/**
 * 
 * @returns {Array<Object>}
 */

export const upcomingRealeases = async ( ) => {
  try {
    const response = await axios.request({
      url: 'https://imdb8.p.rapidapi.com/title/get-coming-soon-movies',
    params: {
      homeCountry: 'US',
      purchaseCountry: 'US',
      currentCountry: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST,
    }});
    return response['results'];
  } catch (error) {
    throw error;
  }
}

/**
 * 
 * @param {String} name
 * @returns 
 */
export const searchMovies = async ( name: string ) => {
  try {
    const response = await axios.request(options['params'].q = `${name}`);
    return response['results'];
  } catch (error) {
    throw error;
  }
}