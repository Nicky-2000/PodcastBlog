// pages/create.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import { Button, Input, Text} from "@chakra-ui/react";
import SpotifySearch from '../components/SpotifySearch';

const Draft: React.FC = () => {
  const [spotifyToken, setSpotifyToken] = useState("");

  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchAndSetToken = async () => {
      let access_token
      let tokenFetchedTime
      // Get the value from local storage if it exists
      access_token = window.localStorage.getItem("spotifyToken") || ""
      console.log("ACCESS_TOKEN FROM WINDOW: " + access_token)
      tokenFetchedTime = window.localStorage.getItem("spotifyTokenFetchedTime") || ""
      if (!access_token || !tokenFetchedTime || (new Date().getTime() - tokenFetchedTime)/1000 > 3000) {
        access_token = await getToken();
        if (access_token) {
          window.localStorage.setItem("spotifyToken", access_token)
          tokenFetchedTime = new Date().getTime()
          window.localStorage.setItem("spotifyTokenFetchedTime", tokenFetchedTime)
        }
      }
      setSpotifyToken(access_token)
    }

    fetchAndSetToken().catch((error) => {console.error(error)})
  }, [])

  const getToken = async () => {
    try {
      const response = await fetch('/api/spotify/getToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const responseJson = await response.json()
      return responseJson.token
    } catch (error) {
      console.error(error);
    }
  }

  const submitData = async (e: React.SyntheticEvent) => {
    const email = session.user.email
    e.preventDefault();
    console.log("SUBMITTING DATA")
    try {
      const body = { title, content, email };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
          <Button onClick={getToken}>
            Get Token
          </Button>
        </form>
        
        <Text>
            TOKEN: {spotifyToken}
          </Text>
          {spotifyToken && <SpotifySearch accessToken={spotifyToken} type="show"/>}
          {/* {spotifyToken && <SpotifySearch accessToken={spotifyToken} type="episode"/>} */}

      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;