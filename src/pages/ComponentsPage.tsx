import * as React from "react";
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import AutoComplete from "../components/SAutoComlpete";
import SAutoCheck from "../components/SAutoCheck";
import SSelect from "../components/SSelect";
import SButtonText from "../components/SButtonText";
import SButtonContained from "../components/SButtonContained";
import SButtonOutlined from "../components/SButtonOutlined";
import SCheckBoxes from "../components/SCheckBoxes";
import SCheckBoxIcons from "../components/SCheckBoxIcons";
import SRadioBoxes from "../components/SRadioBoxes";
import SRating from "../components/SRating";
import SSlider from "../components/SSlider";
import SSwitchBoxes from "../components/SSwitchBoxes";
import SChips from "../components/SChips";
import SAvatarImage from "../components/SAvatarImage";
import SAvatarIcon from "../components/SAvatarIcon";
import SBadge from "../components/SBadge";
import SListItems from "../components/SListItems";
import SListControls from "../components/SListControls";
import SAccordion from "../components/SAccordion";
import SCard from "../components/SCard";
import SLink from "../components/SLink";
import STooltip from "../components/STooltip";
import SDialog from "../components/SDialog";
import STree from "../components/STree";
import STimeLine from "../components/STimeLine";
import SMasonry from "../components/SMasonry";
import SPopOver from "../components/SPopOver";
import SStack from "../components/SStack";
import SGrid from "../components/SGrid";
import SContainer from "../components/SContainer";
import SStepper from "../components/SStepper";
import STabs from "../components/STabs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SFullDialog from "../components/SFullDialog";
import SPopOverFullDialog from "../components/SPopOverFullDialog";
import SNumberField from "../components/SNumberField";
import SColors from "../components/SColors";
import SSwiper from "../components/SSwiper";
import STypography from "../components/STypography";
import Button from "@mui/material/Button";

const sComponents = [
    {url: '#', title: 'Swiper', components: [<SSwiper/>]},
    {url: '#', title: 'Colors', components: [<SColors/>]},
    {url: '#', title: 'NumberField', components: [<SNumberField/>]},
    {url: 'https://mui.com/material-ui/react-typography/', title: 'Typography', components: [<STypography/>]},
    {url: 'https://mui.com/material-ui/react-button/', title: 'Button', components: [<SButtonText/>, <SButtonOutlined/>, <SButtonContained/>]},
    {url: 'https://mui.com/material-ui/react-select/', title: 'Select', components: [<SSelect/>]},
    {url: 'https://mui.com/material-ui/react-autocomplete/', title: 'AutoComplete', components: [<AutoComplete width={300} label="Test autocomplete field"/>, <SAutoCheck/>]},
    {url: 'https://mui.com/material-ui/react-checkbox/', title: 'Checkbox', components: [<SCheckBoxes/>, <SCheckBoxIcons/>]},
    {url: 'https://mui.com/material-ui/react-radio-button/', title: 'Radio', components: [<SRadioBoxes/>]},
    {url: 'https://mui.com/material-ui/react-switch', title: 'Switch', components: [<SSwitchBoxes/>]},
    {url: 'https://mui.com/material-ui/react-slider/', title: 'Slider', components: [<SSlider/>]},
    {url: 'https://mui.com/material-ui/react-rating/', title: 'Rating', components: [<SRating/>]},
    {url: 'https://mui.com/material-ui/react-chip/', title: 'Chips', components: [<SChips/>]},
    {url: 'https://mui.com/material-ui/react-avatar/', title: 'Avatar', components: [<SAvatarImage/>, <SAvatarIcon/>]},
    {url: 'https://mui.com/material-ui/react-badge/', title: 'Badge', components: [<SBadge/>]},
    {url: 'https://mui.com/material-ui/react-list/', title: 'Lists', components: [<SListItems/>, <SListControls/>]},
    {url: 'https://mui.com/material-ui/react-accordion/', title: 'Accordion', components: [<SAccordion/>]},
    {
        url: 'https://mui.com/material-ui/react-card/', title: 'Card', components: [
            <SCard background={""} price={"123 EUR"} title={"Test Title"} elevation={1} id={'123'} description={"Test Description"} subtitle={"Test Subtitle"} images={[
                {src: "https://mui.com/static/images/cards/contemplative-reptile.jpg"},
                {src: "https://mui.com/static/images/cards/paella.jpg"},
                {src: "https://konyv.de/wp-content/uploads/2021/02/B844972-250x363.jpg"},
                {src: "https://media.cnn.com/api/v1/images/stellar/prod/211125112643-bart-the-bear-ii.jpg"},
                {src: "https://media.cnn.com/api/v1/images/stellar/prod/220309153016-02-r   ose-veiled-fairy-wrasse-discovery.jpg"},
                {src: "https://vista.hu/upload/15233/1523307803_kis-55.jpg"}
            ]}/>
        ]
    },
    {url: 'https://mui.com/material-ui/react-link/', title: 'Link', components: [<SLink/>]},
    {
        url: 'https://mui.com/material-ui/react-tooltip/', title: 'Tooltip', components: [
            <STooltip
              title={<React.Fragment><Typography color="primary.dark">Tooltip with HTML</Typography><br/><strong>Asd qwe</strong></React.Fragment>}
              content={<Button>Tooltip Example</Button>}
            />
        ]
    },
    {url: 'https://mui.com/material-ui/react-popover/', title: 'PopOver', components: [<SPopOver/>]},
    {url: 'https://mui.com/material-ui/react-dialog/', title: 'Dialog', components: [<SDialog/>]},
    {url: 'https://mui.com/material-ui/react-dialog/', title: 'Full Screen Dialog', components: [<SFullDialog/>]},
    {url: 'https://mui.com/material-ui/react-dialog/', title: 'PopOver or Full Screen Dialog', components: [<SPopOverFullDialog title={'Test Title'} content={<STree/>}/>]},
    {url: 'https://mui.com/material-ui/react-tree-view/', title: 'Tree', components: [<STree/>]},
    {url: 'https://mui.com/material-ui/react-timeline/', title: 'TimeLine', components: [<STimeLine/>]},
    {url: 'https://mui.com/material-ui/react-masonry/', title: 'Masonry', components: [<SMasonry/>]},
    {url: 'https://mui.com/material-ui/react-stack/', title: 'Stack', components: [<SStack/>]},
    {url: 'https://mui.com/material-ui/react-grid/', title: 'Grid', components: [<SGrid/>]},
    {url: 'https://mui.com/material-ui/react-container/', title: 'Container', components: [<SContainer/>]},
    {url: 'https://mui.com/material-ui/react-stepper/', title: 'Stepper', components: [<SStepper/>]},
    {url: 'https://mui.com/material-ui/react-tabs/', title: 'Tabs', components: [<STabs/>]},
    // {url: '', title: '', components: []},
]

export default function ComponentsPage() {
    return (
      <Container maxWidth="lg">
          {sComponents.map((sComponent) => (
            <>
                <Divider sx={{marginTop: 6}}/>
                <Typography variant="h4" sx={{textAlign: 'center', marginTop: 4, marginBottom: 4}}>
                    <Link href={sComponent.url} target="_blank" underline={"none"}>{sComponent.title}</Link>
                </Typography>
                <Box display={"flex"} gap={3} justifyContent={"center"} flexDirection={"column"}>
                    {sComponent.components.map((component) => (
                      <Box display={"flex"} justifyContent={"center"}>{component}</Box>
                    ))}
                </Box>
            </>
          ))}
      </Container>
    );
}