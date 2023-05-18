import React, { useState } from "react";
import Router from "next/router";

import { Text, Box, Input, Button } from '@chakra-ui/react'

export type SpotifySearchProps = {
    type: string;
    accessToken: string;
};

const SpotifySearch: React.FC<SpotifySearchProps> = ({type, accessToken}: SpotifySearchProps ) => {
    const [rawQuery, setRawQuery] = useState('')
    const handleQueryChange = (event) => setRawQuery(event.target.value)
    
    const handleSearch = async () => {
        fetch('/api/spotify/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({rawQuery, type, accessToken}),
          }).then(async (response) => {
            // const responseJson = awit response.json();
            // console.log(responseJson)
          }).catch((error) => {
            console.error(error)
          })
    }
    return (
        <>
        <Text mb='8px'>Search Show</Text>
            <Input
                value={rawQuery}
                onChange={handleQueryChange}
                placeholder={`Search for a ${type}`}
                size='sm'
            />
            <Button onClick={handleSearch}>Search</Button>
        </>
    );
};

export default SpotifySearch;
