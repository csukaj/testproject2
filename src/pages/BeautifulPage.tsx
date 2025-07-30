import * as React from "react";
import { Container, Typography, Box, Avatar, Stack, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const carouselImages = [
    "https://picsum.photos/id/1015/800/360",
    "https://picsum.photos/id/1016/800/360",
    "https://picsum.photos/id/1018/800/360"
];

export default function BeautifulPage() {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ mb: 4 }}>
                itt lenne a slider
            </Box>
            <Typography variant="h2" gutterBottom>
                Valami szép kis oldal
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Avatar
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    sx={{ width: 40, height: 40 }}
                />
                <Typography variant="h6">Szerző: Teszt Elek</Typography>
            </Stack>
            <Box sx={{ mb: 4 }}>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.
                </Typography>
                <Typography paragraph>
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
                <Typography paragraph>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h5" gutterBottom>FAQ</Typography>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Mi ez az oldal?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Ez egy teszt oldal, amely bemutatja a különböző MUI komponensek használatát.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Ki a szerző?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Teszt Elek, a példaprojekt fejlesztője.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Hogyan működik a carousel?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            A carousel automatikusan váltogatja a képeket, de kézzel is lapozható.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
}