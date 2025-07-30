import * as React from "react";
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import {ListItems} from "../Types";
import ItemContent from "./ItemContent";

export default function SwiperSection(
  props: {
      listItems: ListItems,
      mapMode: boolean,
      swiper: any,
      setSwiper: React.Dispatch<React.SetStateAction<SwiperRef|null>>
      selectItem: (id: string, selectedBy: string) => void
  }
)
{
    return <Swiper
      // @ts-ignore
      slidesPerView="auto"
      centeredSlides={true}
      effect="slide"
      onSwiper={
          (swiper) => props.setSwiper(swiper)
      }
      onSlideChange={
          (swiper) => {
              if (props.mapMode) {
                  props.selectItem(
                    props.listItems[swiper.activeIndex ?? 0].id,
                    'swiper'
                  )
              }
          }
      }
    >
        {props.listItems.map((item, index) => (
          <SwiperSlide key={index} virtualIndex={index} style={{background: "transparent", width: "360px"}}>
              <ItemContent
                item={item}
                elevation={1}
                background={''}
              />
          </SwiperSlide>
        ))}
    </Swiper>
}