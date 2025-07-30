import * as React from "react";
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function LayoutPage() {
  return (
    <Container maxWidth="lg">
        <Typography variant="h4" sx={{textAlign: 'center', marginTop: 4, marginBottom: 4}} >
            Grid
        </Typography>

        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <Item>xs=8</Item>
            </Grid>
            <Grid item xs={12} md={4}>
                <Item>xs=4</Item>
            </Grid>
            <Grid item xs={12} md={4}>
                <Item>xs=4</Item>
            </Grid>
            <Grid item xs={12} md={8}>
                <Item>xs=8</Item>
            </Grid>
        </Grid>

        <Typography variant="h4" sx={{textAlign: 'center', marginTop: 4, marginBottom: 4}} >
            Column Stack
        </Typography>

        <Stack spacing={2}>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
        </Stack>

        <Typography variant="h4" sx={{textAlign: 'center', marginTop: 4, marginBottom: 4}} >
            Row Stack
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
        </Stack>

        <Typography variant="h4" sx={{textAlign: 'center', marginTop: 4, marginBottom: 4}} >
            Stack Divider
        </Typography>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          alignItems="center" justifyContent="center"
        >
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
        </Stack>

        <Typography variant="h4" sx={{textAlign: 'center', marginTop: 4, marginBottom: 4}} >
            Responsive Stack
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          alignItems="center" justifyContent="center"
        >
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
        </Stack>
    </Container>
  );
}