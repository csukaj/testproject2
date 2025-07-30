import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import listItems from "../data/ListItems";
import SCarouselImages from "../components/SCarouselImages";

export default function AccommodationDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const theme = useTheme();

    // Find the accommodation item by ID
    const accommodation = listItems.find(item => item.id === id);

    // If accommodation not found, show error message
    if (!accommodation) {
        return (
            <Container maxWidth="md" sx={{ paddingY: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Szállás nem található
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        A keresett szállás nem található.
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={() => navigate('/layoutExample')}
                        startIcon={<ArrowBackIcon />}
                    >
                        Vissza a listához
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ paddingY: 4 }}>
            {/* Back button */}
            <Box sx={{ marginBottom: 3 }}>
                <Button 
                    onClick={() => navigate('/layoutExample')}
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                >
                    Vissza a listához
                </Button>
            </Box>

            {/* Main content */}
            <Stack spacing={4}>
                {/* Title and price */}
                <Box>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {accommodation.title}
                    </Typography>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                        {accommodation.price}
                    </Typography>
                </Box>

                {/* Image gallery */}
                <Card sx={{ overflow: 'hidden' }}>
                    <SCarouselImages
                        id={"accommodation-detail-carousel-" + accommodation.id}
                        slides={
                            accommodation.images.map(
                                image => {
                                    return { img: { src: image.src } }
                                }
                            )
                        }
                    />
                </Card>

                {/* Details sections */}
                <Stack spacing={3}>
                    {/* Basic Information */}
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Alapinformációk
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Szállás azonosító:
                                    </Typography>
                                    <Typography variant="body1">
                                        {accommodation.id}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Név:
                                    </Typography>
                                    <Typography variant="body1">
                                        {accommodation.title}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Ár:
                                    </Typography>
                                    <Typography variant="body1" color="primary" fontWeight="bold">
                                        {accommodation.price}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    {/* Location Information */}
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                <LocationOnIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                                Helyszín
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Szélesség (Latitude):
                                    </Typography>
                                    <Typography variant="body1">
                                        {accommodation.position.lat}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Hosszúság (Longitude):
                                    </Typography>
                                    <Typography variant="body1">
                                        {accommodation.position.lng}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Koordináták:
                                    </Typography>
                                    <Typography variant="body1">
                                        {accommodation.position.lat}, {accommodation.position.lng}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    {/* Images Information */}
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Képek ({accommodation.images.length} db)
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Főkép:
                                    </Typography>
                                    <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                                        {accommodation.img.src}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Galéria képek:
                                    </Typography>
                                    {accommodation.images.map((image, index) => (
                                        <Typography key={index} variant="body2" sx={{ wordBreak: 'break-all' }}>
                                            {index + 1}. {image.src}
                                        </Typography>
                                    ))}
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>

                {/* Action buttons */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button 
                        variant="outlined" 
                        onClick={() => navigate('/layoutExample')}
                    >
                        Vissza a listához
                    </Button>
                    <Button variant="contained" size="large">
                        Foglalás
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
}