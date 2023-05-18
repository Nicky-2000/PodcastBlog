import axios from 'axios'


export default async function handle(req, res): Promise<void> {
    const token = await getToken()
    console.log(`Access_token: ${token.access_token}`)
    res.status(200).json({ token: token.access_token });
}

const getToken = async () => {
    const tokenURL = 'https://accounts.spotify.com/api/token';
    const requestData = new URLSearchParams();
    requestData.append('grant_type', 'client_credentials');
    requestData.append('client_id', process.env.SPOTIFY_CLIENT_ID);
    requestData.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET);
    
    // Set the headers
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
  
  // Make a POST request to the Spotify API
  try {
    const response = await axios.post(tokenURL, requestData.toString(), { headers })
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null
  }
} 