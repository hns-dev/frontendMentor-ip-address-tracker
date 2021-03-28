const axios = require('axios')

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
    
    try {
      const { IPIFY_URL, IPIFY_KEY } = process.env
      const { ip, domain } = event.queryStringParameters || ''
      const url = `${IPIFY_URL}?apiKey=${IPIFY_KEY}&ipAddress=${ip}&domain=${domain}`
      const { data } = await axios.get(url)
        
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }
    } catch (error) {
      return { statusCode: 500, body: error.toString() }
    }
  }
  
  module.exports = { handler }