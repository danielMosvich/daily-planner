/* eslint-disable react/prop-types */
import { useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect } from "react";
import IconButton from "../buttons/iconButton";
// import alarm_sound from './alarm_sound.mp3'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
`;
const ContainerClock = styled(motion.div)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
  box-shadow: ${(props) =>
    props.isStart ? "var(--box-shadow-5-hover)" : "var(--box-shadow-5)"};
  transition: box-shadow var(--transition-1);
`;
const ContainerShadow = styled(motion.div)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  position: absolute;
  background-color: transparent;
  transition: box-shadow 0.3s;
  z-index: 5;
  /* background-color: red; */
`;
const Span = styled.span`
  /* font-size: 3rem; */
  font-size: var(--font-size-xxl);
  font-weight: 600;
  font-family: var(--font-2);
  color: var(--text-color-1);
`;
const SpanColored = styled.span`
  /* font-size: 3rem; */
  font-size: var(--font-size-xxl);
  font-weight: 600;
  font-family: var(--font-2);
  color: var(--user-color-1);
  /* font-family: "Roboto", sans-serif; */
`;
const ContainerButtons = styled.div`
  /* position: absolute; */
  /* bottom: -70px; */
  /* margin-top: 40px; */
  display: flex;
  gap: 10px;
`;
const TitleClock = styled.h2`
  color: var(--user-color-1);
  /* font-size: 1.3rem; */
  font-size: var(--font-size-md);
  font-family: "Roboto", sans-serif;
  text-transform: capitalize;
`;
export default function Clock({
  minutes,
  seconds,
  showModal,
  isStart,
  setIsStart,
  type,
}) {
  const [isComplete, setIsComplete] = useState(false);

  const [timeSeconds, setTimeSeconds] = useState(
    (minutes * 60 + seconds) * 1000
  );
  const [showMinutes, setShowMinutes] = useState("");
  const [showSeconds, setShowSeconds] = useState("");

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <SpanColored>00:00</SpanColored>;
    } else {
      return (
        <>
          {timeSeconds >= 3600000 && <Span>{zeroPad(hours)}:</Span>}
          <Span style={{ transition: "var(--transition-1)" }}>
            {zeroPad(minutes)}:
          </Span>
          <SpanColored>{zeroPad(seconds)}</SpanColored>
        </>
      );
    }
  };
  function handleTick({ total, minutes, seconds }) {
    setTimeSeconds(total);
    setShowMinutes(minutes);
    setShowSeconds(seconds);
  }
  function handlePause() {
    new Audio("./tap_sound.mp3").play();
    setIsStart(false);
  }
  function handlePlay() {
    new Audio("./tap_sound.mp3").play();
    if (isComplete) {
      setShowMinutes(minutes);
      setShowSeconds(seconds);
      setTimeSeconds((minutes * 60 + seconds) * 1000);
      setIsComplete(false);
      setIsStart(true);
    }
    setIsStart(true);
  }
  function handleReset() {
    new Audio("./tap_sound.mp3").play();
    setIsStart(false);
    setTimeSeconds((minutes * 60 + seconds) * 1000);
    setShowMinutes(minutes);
    setShowSeconds(seconds);
  }
  function handleComplete() {
    new Audio("./alarm_sound.mp3").play();
    setIsStart(false);
    setShowMinutes(0);
    setShowSeconds(0);
    setIsComplete(true);
  }

  function showModalClock() {
    showModal(true);
  }

  useEffect(() => {
    setTimeSeconds((minutes * 60 + seconds) * 1000);
    setShowMinutes(minutes);
    setShowSeconds(seconds);
  }, [minutes, seconds]);
  return (
    <Container>
      <ContainerClock isStart={isStart}>
        <ContainerShadow
          isStart={isStart}
          animate={
            isStart
              ? {
                  boxShadow: [
                    "-10px 0px 10px var(--user-color-1)",
                    "10px 0px 10px var(--user-color-1)",
                    "-10px 0px 10px var(--user-color-1)",
                  ],
                  rotate: [360, 0, -360],
                }
              : {
                  boxShadow: "0 0 0 transparent",
                  rotate: 0,
                }
          }
          transition={
            isStart
              ? {
                  duration: 4,
                  ease: "linear",
                  repeat: Infinity,
                }
              : {
                  duration: 3,
                  ease: "linear",
                }
          }
        ></ContainerShadow>
        <div>
          {isStart ? (
            <Countdown
              onPause={handlePause}
              onTick={handleTick}
              onComplete={handleComplete}
              date={Date.now() + timeSeconds}
              renderer={renderer}
            ></Countdown>
          ) : (
            <>
              {timeSeconds >= 3600000 && !isStart && (
                <Span style={{ transition: "var(--transition-1)" }}>
                  {zeroPad(Math.round(timeSeconds / 3600000))}:
                </Span>
              )}
              {/* <Span>{zeroPad(showMinutes)}:</Span> */}
              <Span style={{ transition: "var(--transition-1)" }}>
                {zeroPad(Math.floor(timeSeconds / 60000) % 60)}:
              </Span>
              {/* <SpanColored>{zeroPad(showSeconds)}</SpanColored> */}
              <SpanColored>{zeroPad(showSeconds)}</SpanColored>
            </>
          )}
        </div>
        <TitleClock>{type}</TitleClock>
      </ContainerClock>
      <ContainerButtons>
        {isStart ? (
          <IconButton
            anyFunction={handlePause}
            outlined
            size={40}
            bgOutlined={"var(--color-red)"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </svg>
          </IconButton>
        ) : (
          <IconButton anyFunction={handlePlay} outlined size={40}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          </IconButton>
        )}
        <IconButton
          anyFunction={handleReset}
          outlined
          size={40}
          bgOutlined={"var(--color-green)"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </IconButton>
        <IconButton
          anyFunction={showModalClock}
          outlined
          size={40}
          bgOutlined={"var(--color-gray)"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </IconButton>
      </ContainerButtons>
    </Container>
  );
}
