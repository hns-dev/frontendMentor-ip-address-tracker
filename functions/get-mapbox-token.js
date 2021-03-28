const axios = require('axios');

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {

  try {
    const { MAPBOX_TOKEN } = process.env;
    
    return {
      statusCode: 200,
      body: JSON.stringify(MAPBOX_TOKEN)
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
  }
  
  module.exports = { handler }