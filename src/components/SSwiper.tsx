import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useState} from "react";
import Button from "@mui/material/Button";

export default function SSwiper() {
  const slides = Array.from({ length: 10 }).map(
    (el, index) => `Slide ${index + 1}`
  );

  const [swiper, setSwiper] = useState(null)

  // @ts-ignore
  const slideTo = (index: number) => swiper.slideTo(index)

  // @ts-ignore
  return (<Swiper slidesPerView="auto" centeredSlides={true} effect="slide" onSwiper={(swiper) => setSwiper(swiper)}>
      {slides.map((slideContent, index) => (
        <SwiperSlide key={slideContent} virtualIndex={index} style={{background: "gray", width: "200px", height: "100px"}}>
          {slideContent}
          <Button onClick={() => slideTo(index)}>select</Button>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}