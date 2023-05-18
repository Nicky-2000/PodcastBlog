import React, { useState } from "react";
import Router from "next/router";

import { Text, Box, Input, Button, Flex, VStack } from "@chakra-ui/react";
import DisplayShowSearchResult from "./DisplayShowSearchResult";

export type SpotifySearchProps = {
  type: string;
  accessToken: string;
};

const SpotifySearch: React.FC<SpotifySearchProps> = ({
  type,
  accessToken,
}: SpotifySearchProps) => {
  const [rawQuery, setRawQuery] = useState("");
  const handleQueryChange = (event) => setRawQuery(event.target.value);

  const [simplifiedShowData, setSimplfiedShowData] = useState<
    Array<ShowDataSimplified>
  >([]);

  const handleSearch = async () => {
    fetch("/api/spotify/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rawQuery, type, accessToken }),
    })
      .then(async (response) => {
        const { data } = await response.json();
        const simpleShowDataArray = simplifyShowSearchResults(data.shows.items);
        setSimplfiedShowData(simpleShowDataArray);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Flex mb="50px" direction="column">
        <Text mb="8px">Search Show</Text>
        <Input
          value={rawQuery}
          onChange={handleQueryChange}
          placeholder={`Search for a ${type}`}
          size="sm"
        />
        <Button onClick={handleSearch}>Search</Button>
        <VStack>
          {simplifiedShowData &&
            simplifiedShowData.map((showData) => {
              return (
                <>
                  <DisplayShowSearchResult showData={showData} />
                </>
              );
            })}
        </VStack>
      </Flex>
    </>
  );
};

export interface ShowDataSimplified {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  showLink: string;
}

const simplifyShowSearchResults = (shows) => {
  const simplifiedShowDataArray = [];
  for (const show of shows) {
    const simplifiedShowData: ShowDataSimplified = {
      id: show.id ? show.id : "",
      name: show.name ? show.name : "UNKNOWN NAME",
      description: show.description ? show.description : "No Description",
      imageUrl: show.images[2].url ? show.images[2].url : "",
      showLink: show.external_urls.spotify ? show.external_urls.spotify : "",
    };
    simplifiedShowDataArray.push(simplifiedShowData);
  }
  return simplifiedShowDataArray;
};

export default SpotifySearch;
