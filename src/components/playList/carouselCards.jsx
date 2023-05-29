/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper";
import styled from "styled-components";
import PlayListCard from "./playlistCard";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./carouselCards.css";

const FlickContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* background-color: red; */
`;
export default function CarouselCards({ songs, allPlaying, setAllPlaying }) {

  return (
    <FlickContainer>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards,Navigation,Pagination]}
        className="mySwiper"
        style={{
          // width: "350px",
          // height: "250px",
          overflow:"visible",
          // background:"green"
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
      >
        {songs &&
          songs.map((e, i) => (
            <SwiperSlide
              key={i}
              style={{
                // backgroundColor: "pink",
                display: "flex",
                overflow: "hidden",
                borderRadius: "10px",
              }}
            >
              <PlayListCard
              allPlaying={allPlaying}
              setAllPlaying={setAllPlaying}
                card
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
