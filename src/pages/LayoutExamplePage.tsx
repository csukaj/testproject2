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
import {Card, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import SFilterButton from "../components/SFilterButton";
import MapSection from "../sections/MapSection";
import listItems from "../data/ListItems";
import listItemConnections from "../data/ListItemConnections"
import FiltersSection from "../sections/FiltersSection";
import SwiperSection from "../sections/SwiperSection";
import ListSection from "../sections/ListSection";
import {SwiperRef} from 'swiper/react';
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const mapModeCarouselHeight = 300
const mapId = "GoogleMap-1"

export default function LayoutExamplePage() {
    const theme = useTheme()

    const [order, setOrder] = useState('')
    const [filterText, setFilterText] = useState('')
    const [filteredData, setFilteredData] = useState(listItems)
    const [currentItem, setCurrentItem] = useState('')
    const [currentItemSelectedBy, setCurrentItemSelectedBy] = useState('')
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [swiper, setSwiper] = useState<SwiperRef | null>(null)
    const [mapMode, setMapMode] = useState(false)
    const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);
    const [listScrolled, setListScrolled] = useState(false)
    const [updateListWithMap, setUpdateListWithMap] = useState(false)
    const [mapMarkers, setMapMarkers] = useState([])
    const [mapLines, setMapLines] = useState([])

    window.addEventListener('scroll', () => setListScrolled(window.scrollY > 130));

    const carouselSlideTo = (id: string) => {
        // @ts-ignore
        swiper.slideTo(
          filteredData.findIndex(
            (item) => item.id === id
          )
        )
    }

    React.useEffect(
      () => {
          window.addEventListener(
            'resize',
            () => setWindowWidth(window.innerWidth)
          );
          return () => {
              window.removeEventListener(
                'resize',
                () => setWindowWidth(window.innerWidth)
              );
          }
      },
      []
    );

    const margin = (windowWidth < theme.breakpoints.values.sm) ? 1 : 2
    const marginPx = theme.spacing(margin)

    const selectItem = (id: string, selectedBy: string) =>
    {
        carouselSlideTo(id)

        setTimeout(() => {
            mapMarkers.map(
              (marker: any) => {
                  if (marker.id === id) {
                      marker.element.classList.add("s-map-marker-active")
                      marker.element.style.setProperty('--marker-color', theme.palette.primary.main);
                  } else {
                      marker.element.classList.remove("s-map-marker-active")
                      marker.element.style.setProperty('--marker-color', theme.palette.common.white);
                  }
              }
            )

            setCurrentItem(id)
            setCurrentItemSelectedBy(selectedBy)
        }, 0)
    }

    const filterByText = (text: string) =>
    {
        setFilterText(text)

        let filtered = listItems.filter(
          item => item.title.toLowerCase().includes(
            text.toLowerCase()
          )
        )

        setFilteredData(filtered)

        setTimeout(() => {
            mapMarkers.map(
              (marker: any) => {
                  if (filtered.find(item => item.id === marker.id)) {
                      marker.element.classList.remove("s-map-marker-hidden")
                  } else {
                      marker.element.classList.add("s-map-marker-hidden")
                  }
              }
            )

            mapLines.map(
              (line: any) => {
                  if (filtered.find(item => item.id === line.from) && filtered.find(item => item.id === line.to)) {
                      line.setVisible(true)
                  } else {
                      line.setVisible(false)
                  }
              }
            )
        }, 0)
    }

    return (
      <Container
        maxWidth={false}
        disableGutters={true}
      >
          <Box sx={{
              position: "fixed",
              right: 0,
              width: {
                  xs: 1,
                  md: "calc(100% - 400px)",
                  lg: "62%",
                  xl: "calc(100% - 728px)",
              }
          }}>
              <MapSection
                mapMode={mapMode}
                setMapMode={setMapMode}
                windowWidth={windowWidth}
                marginPx={marginPx}
                margin={margin}
                connections={listItemConnections}
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
                selectItem={selectItem}
                listItems={filteredData}
                mapMarkers={mapMarkers}
                setMapMarkers={setMapMarkers}
                mapLines={mapLines}
                setMapLines={setMapLines}
                mapModeCarouselHeight={mapModeCarouselHeight}
              />
          </Box>
          <Box sx={{
              position: {
                  xs: "absolute",
                  md: "initial"
              },
              width: {
                  xs: 1,
                  md: "400px",
                  lg: "38%",
                  xl: "728px",
              },
              marginTop: {
                  xs: theme.typography.pxToRem(48),
                  md: 0
              },
              background: {
                  xs: mapMode ? "transparent" : "#fff",
                  md: "transparent"
              },
              height: {
                  xs: mapMode ? theme.typography.pxToRem(mapModeCarouselHeight) : 'auto',
                  md: 'auto'
              },
              bottom: {
                  xs: mapMode ? '0' : 'unset',
                  md: 'unset'
              },
              overflow: "hidden",
          }}>
              <Box sx={{
                  display: {
                      xs: mapMode ? undefined : "none",
                      md: "none"
                  },
                  paddingBottom: theme.typography.pxToRem(30)
              }}>
                  <SwiperSection
                    listItems={listItems}
                    mapMode={mapMode}
                    swiper={swiper}
                    setSwiper={setSwiper}
                    selectItem={selectItem}
                  />
              </Box>
              <Box sx={{
                  display: {
                      xs: mapMode ? "none" : "block",
                      md: "block"
                  }
              }}>
                  <Box sx={{
                      paddingTop: 2,
                      paddingX: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                  }}>
                      <Box sx={{
                          display: "flex",
                          gap: 2,
                      }}>
                          <SDateRangePicker id="s-date-range-filter" value={dateRange} setValue={setDateRange}/>
                          <SPopOverFullDialog
                            placement={"bottom-end"}
                            buttonIcon={<PersonIcon/>}
                            size="large"
                            buttonText={'2'}
                            title={'Vendégek'}
                            content={
                                <Box sx={{paddingX: 2, paddingBottom: 2, paddingTop: 1, display: "flex", gap: 2, flexDirection: "column"}}>
                                    <SCheckBoxes label="Checkboxes List Example"/>
                                    <SRadioBoxes label="Radio Boxes List Example"/>
                                    <SSwitchBoxes label="Switches"/>
                                </Box>
                            }
                          />
                      </Box>
                      <TextField
                        value={filterText}
                        placeholder="Keresés"
                        onChange={event => filterByText(event.target.value.toLowerCase())}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small"/></InputAdornment>,
                            endAdornment: <InputAdornment position="end" hidden={filterText === ''}>
                                <IconButton
                                  edge="end"
                                  size="small"
                                  onClick={event => filterByText('')}
                                >
                                    <CloseIcon fontSize="small"/>
                                </IconButton>
                            </InputAdornment>,
                        }}
                      />
                  </Box>
                  <Box sx={{
                      paddingTop: 2,
                      paddingX: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                  }}>
                  <Stack direction="row" gap={2} alignItems="center" justifyContent={"space-between"}>
                      <Box>
                          <Typography variant="body1" color="text.secondary">
                              <strong>123 szállás</strong>  (456)
                          </Typography>
                      </Box>
                      <Box>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={order}
                            onChange={(event: SelectChangeEvent) => setOrder(event.target.value as string)}
                            displayEmpty
                            sx={{
                                color: order ? null : theme.palette.text.disabled
                            }}
                            startAdornment={
                                <InputAdornment position="start" hidden={order === ''}>
                                    <IconButton edge="start" size="small" onClick={() => setOrder('')}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            }
                          >
                              <MenuItem value={''} sx={{display: 'none'}}>Rendezés Népszerűség szerint</MenuItem>
                              <MenuItem value={'popularity-asc'}>Népszerűtlenség szerint</MenuItem>
                              <MenuItem value={'price-asc'}>Olcsók</MenuItem>
                              <MenuItem value={'price-desc'}>Drágák</MenuItem>
                              <MenuItem value={'rating-desc'}>Faszák</MenuItem>
                          </Select>
                      </Box>
                  </Stack>
                  </Box>
                  <Stack sx={{
                      paddingBottom: 2
                  }}>
                      <ListSection
                        listItems={listItems}
                        currentItem={currentItem}
                        currentItemSelectedBy={currentItemSelectedBy}
                        margin={margin}
                        mapId={mapId}
                        selectItem={selectItem}
                      />
                  </Stack>
              </Box>
          </Box>

          <Box sx={{
              position: "fixed",
              width: {
                  xs: "100%",
                  md: "calc(100% - 400px - " + theme.spacing(margin) + ")",
                  lg: "calc(100% - 38% - " + theme.spacing(margin) + ")",
                  xl: "calc(100% - 728px - " + theme.spacing(margin) + ")",
              },
              top: {
                  xs: theme.typography.pxToRem(theme.mixins.toolbar.minHeight as number),
                  md: "calc(" + theme.typography.pxToRem(theme.mixins.toolbar.minHeight as number) + " + " + marginPx + ")"
              },
              left: {
                  xs: 0,
                  md: "400px",
                  lg: "38%",
                  xl: "728px",
              },
              padding: 2,
              paddingBottom: 0,
              background: {
                  xs: mapMode ? "transparent" : "#fff",
                  md: "transparent"
              }
          }}>
              <FiltersSection
                mapMode={mapMode}
                listScrolled={listScrolled}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
          </Box>

          <Box
            hidden={windowWidth < theme.breakpoints.values.md}
            sx={{
                position: "fixed",
                width: {
                    xs: "100%",
                    md: "calc(100% - 400px - " + theme.spacing(margin) + ")",
                    lg: "calc(100% - 38% - " + theme.spacing(margin) + ")",
                    xl: "calc(100% - 728px - " + theme.spacing(margin) + ")",
                },
                bottom: theme.spacing(margin * 2),
                left: {
                    xs: 0,
                    md: "400px",
                    lg: "38%",
                    xl: "728px",
                },
                padding: 2,
                paddingBottom: 0,
                background: {
                    xs: mapMode ? "transparent" : "#fff",
                    md: "transparent"
                },
                textAlign: 'center'
            }}
          >
              <Card
                sx={{
                    borderRadius: 10,
                    backgroundColor: theme.palette.grey["300"],
                    width: "max-content",
                    paddingX: 2,
                    display: "inline-flex"
                }}
              >
                  <FormControlLabel
                    control={
                        <Switch checked={updateListWithMap} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUpdateListWithMap(event.target.checked)} name="antoine" />
                    }
                    label="Lista frissítése a térképpel"
                  />
              </Card>
          </Box>

          <Box sx={{
              display: {md: "none"},
              position: "fixed",
              top: "80px",
              right: "50px"
          }}>
              <Button onClick={() => setMapMode(!mapMode)}>map mode</Button>
          </Box>
      </Container>
    );
}