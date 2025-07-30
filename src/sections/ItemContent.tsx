import * as React from "react";
import SCard from "../components/SCard";
import {ListItem} from "../Types";

export default function ItemContent(
  props: {
      item: ListItem,
      elevation: number,
      background: string
  }
) {
    return (
      <SCard
        id={props.item.id}
        title={props.item.title}
        price={props.item.price}
        elevation={props.elevation}
        background={props.background}
        images={props.item.images}
        subtitle={"Test Subtitle"}
        description={'Test Description'}
      />
    );
}