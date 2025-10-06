import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000 }}
      loop={true}
    >
      <SwiperSlide><div className="p-10 bg-red-200">Slide 1</div></SwiperSlide>
      <SwiperSlide><div className="p-10 bg-blue-200">Slide 2</div></SwiperSlide>
      <SwiperSlide><div className="p-10 bg-green-200">Slide 3</div></SwiperSlide>
    </Swiper>
  );
};

export default TestSlider;