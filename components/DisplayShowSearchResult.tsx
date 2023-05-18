import React, { useState } from "react";
import Router from "next/router";

import {
    Image,
  Box,
  Input,
  Button,
  Flex,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ShowDataSimplified } from "./SpotifySearch";

interface DisplayShowSearchResultProps {
  showData: ShowDataSimplified;
}

const DisplayShowSearchResult: React.FC<DisplayShowSearchResultProps> = ({
  showData,
}: DisplayShowSearchResultProps) => {
    
  return <>
  <Box>
    <Image src={showData.imageUrl} alt={showData.name}/>
    {showData.name}

  </Box>
  </>;
};

export default DisplayShowSearchResult;
