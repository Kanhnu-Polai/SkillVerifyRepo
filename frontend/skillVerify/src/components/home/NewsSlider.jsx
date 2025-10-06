import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import { Navigation, Pagination, Autoplay } from "swiper/modules";

const NewsSlider = ({ newsList }) => {
  

  useEffect(() => {
  
  }, [newsList]);

  if (!Array.isArray(newsList) || newsList.length === 0) {
    return <p className="text-center">Loading news...</p>;
  }

  return (
    <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-[60px] xl:px-[70px] mt-6">
      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev custom-nav-btn"></div>
      <div className="swiper-button-next custom-nav-btn"></div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={40}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
      >
        {newsList.map((news, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 shadow-lg rounded-xl bg-white h-[660px] flex flex-col justify-between">
              <img
                src={news.urlToImage}
                alt={news.title}
                 loading="lazy"
                className="w-full h-48 sm:h-56 md:h-64 lg:h-64 xl:h-72 object-cover rounded-md mb-4 "
              />
              <h2 className="text-lg md:text-xl font-bold mb-2 " loading = "lazy">{news.title}</h2>
              <p className="text-gray-600 text-sm mb-1 flex items-center space-x-2">
                <strong>👤</strong> <span>{news.author || "Unknown"}</span>
              </p>
              <p className="text-gray-600 text-sm mb-1 flex items-center space-x-2">
                <strong>🕒</strong> <span>{new Date(news.publishedAt).toLocaleString()}</span>
              </p>
              <p className="text-gray-800 text-sm mt-2 line-clamp-3">{news.description}</p>
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 mt-3 block text-sm no-underline"
              >
                Read more
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsSlider;