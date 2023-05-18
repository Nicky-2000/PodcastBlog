
import axios from 'axios'
import querystring from 'query-string';


// POST /spotify/search
// Required fields in body: title


const token = null;

export default async function handle(req, res) {
    const { access_token, rawQuery, type } = req.body;
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
          type: type
        },
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      };
      try {
        const response = await axios(options)
        console.log(response)
        console.log("HERE???")
        // res.status(200).json({ response });
        res.status(200).json(null)
      } catch (error) {
        console.error(error)
        console.log("here")
      }
}