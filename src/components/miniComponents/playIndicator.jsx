/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
const ContainerPlayIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2.5px;
  width: fit-content;
  min-height: 30px;
  max-height: 30px;
  position: absolute;
  right: 0;
`;
const Bar = styled(motion.div)`
  height: 30px;
  max-width: 3px;
  min-width: 3px;
  background: white;
  border-radius: 1.5px;
`;
function PlayIndicator() {
  const getRandomNumber = (min, max) => {
    return Math.random() * (min - max) + min;
  };
  const BundlePLay = ({ howMany, timeMin, timeMax }) => {
    const total = Array(howMany).fill(null);
    return (
      <ContainerPlayIndicator>
        {total.map((e, i) => (
          <Bar
            key={i}
            animate={{ height: [5, 30, 5] }}
            transition={{
              duration: getRandomNumber(timeMin, timeMax),
              repeat: Infinity,
              bounce: "easeInOut",
            }}
          />
        ))}
      </ContainerPlayIndicator>
    );
  };
  const PlayIndicator = () => {
    return <BundlePLay howMany={4} timeMin={0.8} timeMax={1} />;
  };
  return (
    <PlayIndicator></PlayIndicator>
  );
}
export default React.memo(PlayIndicator);
