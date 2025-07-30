import * as React from 'react';
import { register } from 'swiper/element/bundle';
import Swiper from "swiper";
register()

export default function SCarousel(props: any) {
  new Swiper('#' + props.id, {
    slidesPerView: "auto",
    centeredSlidesBounds: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "slide"
  })

  return (
    <div className="swiper" id={props.id}>
      <div className="swiper-wrapper">
        {props.slides.map((slide: any, index: number) => <div key={index} className="swiper-slide"><img src={slide.img.src} alt="" /></div>)}
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
}
