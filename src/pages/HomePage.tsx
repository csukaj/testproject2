import * as React from "react";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Carousel from 'react-material-ui-carousel'
import { Button } from '@mui/material'
import HomeAppBar from "../appbar/HomeAppBar";

export default function HomePage() {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!"
    },
    {
      name: "Random Name #2",
      description: "Hello World!"
    },
    {
      name: "Random Name #3",
      description: "Hi!"
    }
  ]

  return (
    <Container maxWidth="lg">
      <HomeAppBar />

      <Typography variant="h4" component="h1" gutterBottom>
        SeychelleDev development site
      </Typography>
      <Carousel animation="slide" swipe={true}>
        {
          items.map( (item, i) => <div>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <Button className="CheckButton">
              Check it out!
            </Button>
          </div> )
        }
      </Carousel>
      <Slider
        className="my-4"
        defaultValue={30}
        classes={{active: 'shadow-none'}}
        slotProps={{thumb: {className: 'hover:shadow-none'}}}
      />
      <Typography paragraph>
        A pasolyákban a szülő bronról melmelhet lülméket: Ahogy paszkonnak a kéjedvejk, egyre modalmas, hogy a sajos célső, egyenlődés kintést dult bigos rém egy feres hajózt bizett ki magának és módszeresen hósít el örgés alól priblit, aki közel röppen hozzá... A habakok gyalmag kezőben csatáznak és csak néhányan fidítik magukat férdegnek. Úgy fertítik: tudják, hogyan kanghatják el a kéjedvej parbuszot. Betéve jazdáskodják a gyüge mazatot, tudják a szatásokat, jazdáskodják a forró rekciákat és
        jálanak abban, hogy nekik nem zárdozhatik az almaság. De úgy kedik, az almaság is gyakran hajt gerlásba... Győző arvány, a bánc ezer almaság, kort elemlen gyutatának szalmasa badékony trok után kézkedt ezzel a hennával és egy mencemre újra hidébe masajkálta a sítő jelsőjét!
      </Typography>
      <Typography paragraph>
        A hatar karcok végén a gyümölcs több, mint 4500 pirásszal kélelhett. A plárgás szintén patos, az emenős összenig húzódzják a csökli és a csörvédelet kucskáját. A foncit ma már leginkább küliként izálják deruson. Cseres bazavada csöklőit imozás is alangálhatja, ha úgy illi, hogy valami vaszt. Csak lódzjon a morganta vitásra a prések szeremén! A műség bogratyak kövődés gógika köpregedte bózás az oldalt 0.111 getés alatt köpregedte el. Ballaj csucsoly 24-23 millió karccal ezelőtt, a határt
        dögő panáján muzsincoltak le a slalás szutykony záság pampatára azok a fösdik, melyek baklasszá válva csíras (ügyelő) matál, sömzs kolankokban vájoznak fel a plonos vicsárcán.
      </Typography>
    </Container>
  );
}