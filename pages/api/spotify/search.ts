
import axios from 'axios'
import querystring from 'query-string';


// POST /spotify/search
// Required fields in body: title


const token = null;

export default async function handle(req, res) {
    const { accessToken, rawQuery, type } = req.body;
    const query = querystring.stringify({
        q: rawQuery
    })
    console.log("Query")
    console.log(query)
    const options = {
        method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        params: {
          q: rawQuery,
          type: type,
          market: 'CA',
          limit: 10,
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
      };
      try {
        const response = await axios(options)
        console.log(response)
        console.log("HERE???")
        res.status(200).json({data: response.data});
      } catch (error) {
        console.error(error)
        console.log("here")
      }
}