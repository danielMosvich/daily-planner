/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation, Pagination } from "swiper";
import styled from "styled-components";
import PlayListCard from "./playlistCard";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./carouselCreative.css";

const FlickContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function CarouselCreative({ songs, allPlaying }) {
  return (
    <FlickContainer>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCreative, Pagination, Navigation]}
      >
        {songs &&
          songs.map((e, i) => (
            <SwiperSlide key={i}>
              <PlayListCard
                allPlaying={allPlaying}
                key={e.title + i}
                title={e.title}
                url={e.url}
                image={e.image}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </FlickContainer>
  );
}
