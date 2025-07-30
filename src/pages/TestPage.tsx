import * as React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Box, List, ListItem, ListItemText } from "@mui/material";
import { Post, ApiResponseContentPosts } from "../Types";

async function getPosts(): Promise<Post[]> {
  const url = "https://api.ots.group/content/posts";
  const response = await axios.get<ApiResponseContentPosts>(url);
  return response.data.data;
}

export default function TestPage() {
  const [posts, setPosts] = useState<[] | Post[]>([]);

  useEffect(() => {
    (async () => {
      const posts = await getPosts();
      setPosts(posts);
    })();
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" component="h1" gutterBottom>
            Posts from backend
          </Typography>
          {posts.map((post: Post, key: number) => (
            <Card sx={{ marginBottom: '30px' }} key={key}>
              <CardMedia sx={{ height: 350 }} image={'https://api.ots.group/' + post.lead_image.path} />
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title.en}
                </Typography>
                <Typography sx={{ marginTop: '20px;' }}>
                  {post.lead.en}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={'test/' + post.id}>Read More</Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Elérhetőségek
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Név" secondary="Teszt Elek" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary="teszt@pelda.hu" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Telefon" secondary="+36 30 123 4567" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Cím" secondary="1234 Budapest, Teszt utca 1." />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}