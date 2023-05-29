import styled from "styled-components";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import IconContainer from "../miniComponents/iconContainer";
import PlayIndicator from "../miniComponents/playIndicator";
// import {seekTo} from "react-player"
const Container = styled.div`
  min-width: ${(props) => (props.card === "true" ? "350px" : "370px")};
  min-height: 240px;
  overflow: hidden;
  border-radius: 10px;
  margin: ${(props) => (props.card === "true" ? "0 0px" : "0 35px")};
  position: relative;
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* background-color:red; */
  /* @media (max-width:550px) {
    max-width:200px !important;
    max-height:200px !important;
  } */
  @media (max-width: 550px) {
    min-width: 280px;
    min-height: 200px;
    /* background:red; */
  }
`;
const Content = styled.div`
  padding: 20px;
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
`;
const TitlePlace = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  h3 {
    text-transform: capitalize;
    text-shadow: 0 0 5px #00000086;
    color: white;
    /* font-size: 1.5rem; */
    font-size: var(--font-size-md);
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  p {
    text-shadow: 0 0 10px #00000086;
    color: #ffffffe4;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;
const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
const PlayPauseButton = styled.div`
  width: 40px;
  height: 40px;
  min-width: 35px;
  min-height: 35px;
  padding: 7px;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 50%;
  background-color: white;
  color: var(--user-color-1);
  box-shadow: var(--box-shadow-2);
  cursor: pointer;
  /* background-color: red; */
`;
const ContainerInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  input {
    -webkit-appearance: none;
    appearance: none;
    height: 10px;
    width: 100%;
    background: #e4e4e4;
    border-radius: 10px;
    background-image: linear-gradient(var(--user-color-1), var(--user-color-1));
    background-repeat: no-repeat;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: var(--user-color-1);
      cursor: pointer;
      box-shadow: var(--box-shadow-6);
      &:hover {
        background-color: white;
        box-shadow: inset 0 0 1px black;
      }
    }
    &::-webkit-slider-runnable-track {
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      background: transparent;
    }
  }
`;
// !INDICATOR Play
const ContainerPlay = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

// eslint-disable-next-line react/prop-types
export default function PlayListCard({ title, url, image, card, allPlaying }) {
  const [progres, setProgres] = useState(false);
  const [playing, setPlaying] = useState(allPlaying);
  const [volume, setVolume] = useState(0.5);

  function handleVolume(e) {
    setVolume(Number(e.target.value));
  }

  function handlePlay() {
    playing ? setPlaying(false) : setPlaying(true);
    playing === false && setProgres(false);
  }

  useEffect(() => {
    setPlaying(false);
  }, [allPlaying]);
  return (
    <Container image={image} card={card ? "true" : "false"}>
      <ReactPlayer
        url={url}
        playing={playing}
        volume={volume}
        onProgress={() => {
          setProgres(true);
        }}
        style={{ position: "absolute", display: "none" }}
        muted={!playing}
        onPlay={() => {
          console.log("xd");
        }}
      />
      <Content>
        <TitlePlace>
          <h3>{title}</h3>
        </TitlePlace>
        <Controls>
          <ContainerPlay>
            {playing && progres && <PlayIndicator />}
            <PlayPauseButton onClick={handlePlay}>
              {playing ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </PlayPauseButton>
          </ContainerPlay>
          <ContainerInput>
            <IconContainer size={20} color="white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M24 4.003c0-1.336-1.616-2.006-2.56-1.06l-4.5 4.5h-1.93c-1.142 0-2.319.664-2.66 1.904a9.76 9.76 0 0 0-.35 2.595c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.66 1.905h1.93l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.003Z" />
              </svg>
            </IconContainer>
            <input
              style={{ backgroundSize: `${(volume * 1000) / 10}% 100%` }}
              type="range"
              min={0}
              max={1}
              step={0.01}
              onChange={handleVolume}
              defaultValue={volume}
            />
            <IconContainer size={20} color="white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
              </svg>
            </IconContainer>
          </ContainerInput>
        </Controls>
      </Content>
    </Container>
  );
}
