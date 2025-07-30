import * as React from "react";
import Box from "@mui/material/Box";
import {useState} from "react";
import SMapStyle from "../components/SMapStyle";
import {Wrapper} from "@googlemaps/react-wrapper";
import {useTheme} from "@mui/material/styles";
import {ListItemConnections, ListItems} from "../Types";

const mapApiKey = "AIzaSyD2Wa9QJ_tkkhZ9v96L4ImPr1bLzPYLJDM"
const lang = "hu"
const mapId = "GoogleMap-1"

export default function MapSection(
  props: {
      listItems: ListItems,
      connections: ListItemConnections,
      currentItem: string,
      setCurrentItem: React.Dispatch<React.SetStateAction<string>>,
      windowWidth: number,
      mapMode: boolean,
      setMapMode: React.Dispatch<React.SetStateAction<boolean>>,
      margin: 1 | 2,
      marginPx: string,
      selectItem: (id: string, selectedBy: string) => void,
      mapMarkers: any[],
      setMapMarkers: React.Dispatch<React.SetStateAction<never[]>>
      mapLines: any[],
      setMapLines: React.Dispatch<React.SetStateAction<never[]>>
      mapModeCarouselHeight: number
  }
) {
    const theme = useTheme();

    const [googleMaps, setGoogleMaps] = useState(null)
    const [map, setMap] = useState(null)
    const [bounds, setBounds] = useState(null)

    const mapBoundsPaddings = {
        left: 60,
        right: 60,
        top: 100,
        bottom: props.mapMode ? props.mapModeCarouselHeight : 30
    }

    const setMapBounds = () => {
        if (bounds === null || map === null || googleMaps === null) {
            return
        }
        // @ts-ignore
        map.fitBounds(bounds, mapBoundsPaddings)
    }

    React.useEffect(
      () => {
          if (props.windowWidth >= theme.breakpoints.values.md) {
              props.setMapMode(false)
          }
          setMapBounds()
      },
      [props.mapMode, props.windowWidth]);

    window.onload = () => {
        async function initMap()
        {
            await window.google.maps.importLibrary("marker");

            // @ts-ignore
            setGoogleMaps(window.google.maps)

            let bounds = new window.google.maps.LatLngBounds()

            let googleMap = new window.google.maps.Map(document.getElementById(mapId + "container") as HTMLElement, {
                mapId: mapId,
                disableDefaultUI: true,
                zoomControl: true,
                zoomControlOptions: {
                    position: window.google.maps.ControlPosition.RIGHT_CENTER,
                },
                clickableIcons: false,
                gestureHandling: 'greedy',
                mapTypeControlOptions: {mapTypeIds: ["styled_map"]},
                mapTypeId: 'styled_map',
            });

            googleMap.mapTypes.set("styled_map", new window.google.maps.StyledMapType(SMapStyle));

            props.listItems.map((item) => {
                bounds.extend(item.position)

                let div = document.createElement("div");
                div.className = "s-map-marker";
                div.textContent = item.price;

                let marker = new window.google.maps.marker.AdvancedMarkerElement({
                    position: item.position,
                    map: googleMap,
                    content: div
                });

                marker.element.style.setProperty('--marker-shadow', theme.shadows["2"]);
                marker.element.style.setProperty('--marker-shadow-hover', theme.shadows["5"]);
                marker.element.style.setProperty('--marker-color', theme.palette.common.white);
                marker.element.style.setProperty('--marker-border-radius', theme.shape.borderRadius + 'px');
                marker.element.style.setProperty('--marker-font-size', theme.typography.pxToRem(theme.typography.fontSize));
                marker.element.style.setProperty('--marker-font-family', theme.typography.fontFamily ?? null);

                marker.id = item.id

                marker.addListener("click", () => {
                    props.selectItem(item.id, 'map')
                    if (!props.mapMode) {
                        let element = document.getElementById(mapId + "ListItem" + item.id)
                        if (element) {
                            window.scrollTo({
                                behavior: 'smooth',
                                top: element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 80
                            })
                        }
                    }
                });

                // @ts-ignore
                props.mapMarkers.push(marker)
                // @ts-ignore
                props.setMapMarkers(props.mapMarkers)
            })

            props.connections.map((connection) => {
                let fromItem = props.listItems.find((item) => item.id === connection.from)
                let toItem = props.listItems.find((item) => item.id === connection.to)

                if (fromItem && toItem) {
                    let path = [fromItem.position, toItem.position]

                    let line = new window.google.maps.Polyline({
                        path: path,
                        map: googleMap,
                        strokeColor: theme.palette.warning.light,
                        geodesic: true,
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                    })

                    // @ts-ignore
                    line.from = fromItem.id;
                    // @ts-ignore
                    line.to = toItem.id

                    // @ts-ignore
                    props.mapLines.push(line)
                    // @ts-ignore
                    props.setMapLines(props.mapLines)
                }
            })

            // @ts-ignore
            setBounds(bounds)
            googleMap.fitBounds(bounds, mapBoundsPaddings)

            // @ts-ignore
            setMap(googleMap)
        }

        initMap()
    }

    return (
      <Wrapper apiKey={mapApiKey} language={lang}>
          <Box
            id={mapId + "container"}
            sx={{
                width: {
                    xs: "100%",
                    md: "calc(100% - " + props.marginPx + ")"
                },
                height: {
                    xs: "calc(100vh - " + theme.typography.pxToRem(theme.mixins.toolbar.minHeight as number) + ")",
                    md: "calc(100vh - " + theme.typography.pxToRem(theme.mixins.toolbar.minHeight as number) + " - 2 * " + props.marginPx + ")"
                },
                top: {
                    xs: 0,
                    md: props.marginPx
                },
                borderRadius: {
                    xs: "0",
                    md: theme.typography.pxToRem(8)
                }
            }}
          />
      </Wrapper>
    );
}