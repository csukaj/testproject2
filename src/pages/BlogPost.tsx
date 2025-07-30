import * as React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Card, CardContent, CardMedia} from "@mui/material";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {Post, ApiResponseContentPosts} from "../Types";
import DetailsAppBar from "../appbar/DetailsAppBar";

export default function BlogPostPage() {
  const routeParams = useParams();

  async function getPost(): Promise<undefined | Post> {
    const response = await axios.get<ApiResponseContentPosts>('https://api.ots.group/content/posts')
    const post = response.data.data.find((post) => post.id === parseInt(routeParams.id as string))
    if (post) {
      post.content.en = post.content.en.replaceAll('/storage/', 'https://api.ots.group/storage/')
    }
    return post
  }

  const [post, setPost] = useState<undefined | Post>(undefined);

  useEffect(() => {
    (async () => {
      const post = await getPost();
      setPost(post);
    })();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <DetailsAppBar />
        <Card sx={{ marginBottom: '30px' }}>
          <CardMedia sx={{ height: 350 }} image={'https://api.ots.group/'+ (post ? post.lead_image.path : '')} />
          <CardContent>
            <Typography variant="h5" component="div">
              {post ? post.title.en : ''}
            </Typography>
            <Typography sx={{ marginTop: '20px;' }} dangerouslySetInnerHTML={{__html: post ? post.content.en : ''}} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}