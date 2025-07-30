import * as React from 'react';
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import {useTheme} from "@mui/material/styles";

export default function SMap(props: any)
{
  const theme = useTheme()

  const apiKey = 'AIzaSyD2Wa9QJ_tkkhZ9v96L4ImPr1bLzPYLJDM'
  const id = 'GoogleMapContainer-' + Math.floor(Math.random() * 1000000000)
  const markers = props.markers ?? []
  const options = props.options ?? []
  const lang = props.lang ?? 'en'
  const style = {
    height: props.height ?? "calc(100vh - " + theme.typography.pxToRem(theme.mixins.toolbar.minHeight as number) + ")",
    width: props.width ?? "100%"
  }

  window.onload = () => {
    options.zoom ??= 5
    options.center = new window.google.maps.LatLng(options.center.lat, options.center.lng)
    options.mapId = id

    options.mapTypeControlOptions = {
      mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
    }
    options.mapTypeId ??= 'styled_map'

    let map = new window.google.maps.Map(document.getElementById(id) as HTMLElement, options);

    map.mapTypes.set("styled_map", new window.google.maps.StyledMapType(options.styles));
    map.setMapTypeId("styled_map");

    markers.map((markerOptions: any) => {
      markerOptions.map = map
      markerOptions.position = new window.google.maps.LatLng(markerOptions.position.lat, markerOptions.position.lng)

      let marker = new window.google.maps.Marker(markerOptions)

      markerOptions.marker = marker

      marker.addListener("click", () => {
        markerOptions.onClick(markerOptions)
      });
    })
  }

  return <Wrapper apiKey={apiKey} language={lang}>
    <div id={id} style={style} />
  </Wrapper>
}