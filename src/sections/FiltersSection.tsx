import * as React from "react";
import Container from '@mui/material/Container';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import SPopOverFullDialog from "../components/SPopOverFullDialog";
import {useState} from "react";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";
import SCard from "../components/SCard";
import SCheckBoxes from "../components/SCheckBoxes";
import SRadioBoxes from "../components/SRadioBoxes";
import SSwitchBoxes from "../components/SSwitchBoxes";
import {Swiper, SwiperSlide} from 'swiper/react';
import TuneIcon from '@mui/icons-material/Tune';
import SDateRangePicker from "../components/SDateRangePicker";
import {DateRange} from "@mui/x-date-pickers-pro";
import {Dayjs} from "dayjs";
import PersonIcon from '@mui/icons-material/Person';
import TextField from "@mui/material/TextField";
import {InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import SFilterButton from "../components/SFilterButton";
import MapSection from "../sections/MapSection";
import listItems from "../data/ListItems";
import listItemConnections from "../data/ListItemConnections"
import {ListItemConnections, ListItems} from "../Types";
import SCheckBoxChips from "../components/SCheckBoxChips";

export default function FiltersSection(
  props: {
      mapMode: boolean,
      listScrolled: boolean,
      dateRange: DateRange<Dayjs>,
      setDateRange: (value: (((prevState: [Dayjs | null, Dayjs | null]) => [Dayjs | null, Dayjs | null]) | [Dayjs | null, Dayjs | null])) => void
  }
) {
    return (
      <Tabs
        variant="scrollable"
        scrollButtons={false}
        sx={{width: '100%'}}
      >
          <Stack direction="row" gap={1}>
              <SFilterButton
                hidden={props.mapMode || !props.listScrolled}
                text="Dátumok"
                onClick={() => {
                    window.scrollTo({
                        behavior: 'smooth',
                        top: 0
                    })

                    // let element = document.getElementById('s-date-range-filter-start-input')
                    //
                    // if (!element) {
                    //   return
                    // }
                    //
                    // element.focus();
                    //
                    // element.dispatchEvent(new Event("click", { bubbles: false, cancelable: true }))
                    //
                    // let e = document.createEvent('Event');
                    // e.initEvent("click", true, true);
                    // element.dispatchEvent(e);
                }}
                startIcon={<TuneIcon/>}
                dropDownArrowIcon={false}
              />

              <SFilterButton
                hidden={props.mapMode || !props.listScrolled}
                text="Vendégek"
                onClick={() => {
                    window.scrollTo({
                        behavior: 'smooth',
                        top: 0
                    })
                }}
                startIcon={<TuneIcon/>}
                dropDownArrowIcon={false}
              />

              <SPopOverFullDialog
                hidden={!props.mapMode}
                buttonText={'Dátumok'}
                title={'Dátumok'}
                content={
                    <Box sx={{paddingX: 2, paddingBottom: 2, paddingTop: 1, display: "flex", gap: 2, flexDirection: "column"}}>
                        <SDateRangePicker id="test2" value={props.dateRange} setValue={props.setDateRange}/>
                    </Box>
                }
              />

              <SPopOverFullDialog
                hidden={!props.mapMode}
                buttonText={'Vendégek'}
                title={'Vendégek'}
                content={
                    <Box sx={{paddingX: 2, paddingBottom: 2, paddingTop: 1, display: "flex", gap: 2, flexDirection: "column"}}>
                        <SCheckBoxes label="Checkboxes List Example"/>
                        <SRadioBoxes label="Radio Boxes List Example"/>
                        <SSwitchBoxes label="Switches"/>
                    </Box>
                }
              />

              <SPopOverFullDialog
                buttonText={'Összes szűrő'}
                title={'Szürők'}
                buttonIcon={<TuneIcon/>}
                content={
                    <Box sx={{paddingX: 2, paddingBottom: 2, paddingTop: 1, display: "flex", gap: 2, flexDirection: "column"}}>
                        <SCheckBoxes label="Checkboxes List Example"/>
                        <SRadioBoxes label="Radio Boxes List Example"/>
                        <SSwitchBoxes label="Switches"/>
                        <SCheckBoxChips label={"CheckBox Chips"} />
                        <SCheckBoxChips label={"Another Option"} />
                        <SCheckBoxChips label={"And a Third One"} />
                    </Box>
                }
              />

              <SPopOverFullDialog
                buttonText={'Összes sziget'}
                title={'Szigetek'}
                content={
                    <Box sx={{paddingX: 2, paddingBottom: 2, paddingTop: 1, display: "flex", gap: 2, flexDirection: "column"}}>
                        <SCheckBoxes label="Checkboxes List Example"/>
                        <SRadioBoxes label="Radio Boxes List Example"/>
                        <SSwitchBoxes label="Switches"/>
                    </Box>
                }
              />

              <SPopOverFullDialog
                buttonText={'Szállás típusa'}
                title={'Szállástípusok'}
                content={
                    <Box sx={{paddingX: 2, paddingBottom: 2, paddingTop: 1, display: "flex", gap: 2, flexDirection: "column"}}>
                        <SCheckBoxes label="Checkboxes List Example"/>
                        <SRadioBoxes label="Radio Boxes List Example"/>
                        <SSwitchBoxes label="Switches"/>
                    </Box>
                }
              />

          </Stack>
      </Tabs>
    );
}