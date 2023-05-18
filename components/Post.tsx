import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";


import { Text, Box } from '@chakra-ui/react'

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const postBoxStyle = {
  bg: "#FFADD6",
  borderRadius: "10px",
  __hover: {
    shadow: "0px"
  }
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Box sx={postBoxStyle} onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <Text>{post.title}</Text>
      <Text>By {authorName}</Text>
      <ReactMarkdown children={post.content} />
    </Box>
  );
};

export default Post;
