import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import Box from "@mui/material/Box";
import {useTheme} from '@mui/material/styles';
import SCarouselImages from "./SCarouselImages";
import Stack from "@mui/material/Stack";
import STooltip from "./STooltip";

export default function SCard(
  props: {
      id: string
      title: string
      description: string
      subtitle: string
      elevation: number
      background: string
      images: { src: string }[]
      price: string
  }
) {
    const theme = useTheme();

    return (
      <Card sx={{width: "100%", position: "relative", backgroundColor: props.background}} elevation={props.elevation}>
          <Box>
              <SCarouselImages
                id={"TestCardCarousel-" + props.id}
                slides={
                    props.images.map(
                      image => {
                          return {img: {src: image.src}}
                      }
                    )
                }
              />
          </Box>
          <CardContent
            sx={{
                position: "absolute",
                right: 0,
                borderRadius: 1,
                paddingY: 1,
                paddingX: 2,
                marginTop: "-30px",
                marginRight: 2,
                zIndex: 1,
                background: theme.palette.primary.main,
                color: "white"
            }}
          >
              Test 123
          </CardContent>
          <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                  {props.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div" gutterBottom>
                  {props.subtitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div" gutterBottom>
                  {props.description}
              </Typography>
              <Stack direction="row" gap={2} alignItems="center" justifyContent={"space-between"}>
                  <Box>
                      <STooltip
                        placement="right"
                        title={<React.Fragment><Typography color="primary.dark">Tooltip with HTML</Typography><br/><strong>Asd qwe</strong></React.Fragment>}
                        content={<Box>
                            <Typography variant="body2" color="text.secondary" component="div">
                                {props.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="div">
                                4 felnőtt
                            </Typography>
                        </Box>}
                      />
                  </Box>
                  <Box>
                      <Button size="small" color="primary">Részletek</Button>
                      <Button variant="contained" size="small">Részletek</Button>
                  </Box>
              </Stack>
          </CardContent>
      </Card>
    );
}
