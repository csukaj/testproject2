import * as React from "react";
import Container from '@mui/material/Container';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import SPopOverFullDialog from "../components/SPopOverFullDialog";
import {useState} from "react";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";
import SCheckBoxes from "../components/SCheckBoxes";
import SRadioBoxes from "../components/SRadioBoxes";
import SSwitchBoxes from "../components/SSwitchBoxes";
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
import SFilterButton from "../components/SFilterButton";
import MapSection from "../sections/MapSection";
import listItems from "../data/ListItems";
import listItemConnections from "../data/ListItemConnections"
import FiltersSection from "../sections/FiltersSection";
import ItemContent from "../sections/ItemContent";
import SwiperSection from "../sections/SwiperSection";
import {ListItemConnections, ListItems} from "../Types";

export default function ListSection(
  props: {
      listItems: ListItems
      currentItem: string
      currentItemSelectedBy: string
      margin: 1 | 2
      mapId: string
      selectItem: (id: string, selectedBy: string) => void
  }
) {
    const theme = useTheme()

    return (
      <>
          {
              props.listItems.map((item, index) => (
                <Box
                  sx={{marginX: props.margin, marginTop: props.margin}}
                  key={index}
                  id={props.mapId + "ListItem" + item.id}
                  onMouseOver={() => props.selectItem(item.id, 'list')}
                >
                    <ItemContent
                      item={item}
                      elevation={props.currentItem === item.id ? 5 : 1}
                      background={props.currentItemSelectedBy === 'map' && props.currentItem === item.id ? theme.palette.primary.light : ''}
                    />
                </Box>
              ))
          }
      </>
    );
}