/* eslint-disable react/prop-types */
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
const Container = styled(motion.button)`
  /* position: relative; */
  width: ${(props) => props.size + "px"};
  height: ${(props) => props.size + "px"};
  padding: 5px;
  color: ${(props) => (props.color ? props.color : "var(--user-color-1)")};
  border: none;
  background-color: transparent;
  /* outline: none; */
  border-radius: 5px;
  transition: color var(--transition-1), background var(--transition-1);
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.bg ? props.bg : "var(--user-color-1)"};
    color: white;
  }
  &:disabled {
    filter: grayscale(1);
    background-color: var(--fill-2);
    color: var(--user-color-1);
  }
`;
const ContainerOutlined = styled(motion.button)`
  position: relative;
  height: ${(props) => props.size + "px"};
  width: ${(props) => props.size + "px"};
  padding: 4px;
  background-color: transparent;
  color: ${(props) =>
    props.bgOutlined ? props.bgOutlined : "var(--user-color-1)"};
  border: 1px solid
    ${(props) => (props.bgOutlined ? props.bgOutlined : "var(--user-color-1)")};
  border-radius: ${(props) => (props.circle ? "50%" : "5px")};
  cursor: pointer;
  transition: background var(--transition-1), color var(--transition-1),
    stroke var(--transition-1);
  box-shadow: var(--box-shadow-2);
  stroke: var(--user-color-1);
  /* display: flex;
  justify-content: center;
  align-items: center; */
  &:hover {
    background-color: ${(props) =>
      props.bgOutlined ? props.bgOutlined : "var(--user-color-1)"};
    color: white;
    stroke: white;
  }
  &:disabled {
    filter: grayscale(1);
    background-color: transparent;
    color: var(--user-color-1);
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  background-color: var(--fill-1);
  border: 1px solid var(--text-color-4);
  box-shadow: var(--box-shadow-1);
  color: var(--text-color-4);
  bottom: ${(props) =>
    props.tooltipButton ? "calc(-100% + -5px)" : "calc(100% + 5px)"};
  z-index: 10;
  padding: 5px;
  border-radius: 5px;
  width: fit-content;
  white-space: nowrap;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 0.9rem;
  z-index: 10;
`;
const Cont = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;
export default function IconButton({
  children,
  size = 30,
  anyFunction,
  bg,
  bgOutlined,
  color,
  conditional = false,
  outlined,
  active,
  text,
  tooltipButton,
  circle,
  style,
}) {
  const [showToolTip, setShowToolTip] = useState(false);
  function handleFunction() {
    anyFunction && anyFunction();
  }

  return (
    <Cont size={size} style={style}>
      {showToolTip && text && (
        <Tooltip
          tooltipButton={tooltipButton}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {text}
        </Tooltip>
      )}
      {outlined ? (
        <ContainerOutlined
          style={
            active && {
              backgroundColor: bgOutlined ? bgOutlined : "var(--user-color-1)",
              color: "white",
            }
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={!conditional && { y: 2 }}
          size={size}
          bg={bg}
          color={color}
          onClick={handleFunction}
          disabled={conditional}
          bgOutlined={bgOutlined}
          // active={active}
          circle={circle}
          onMouseEnter={() => {
            setShowToolTip(true);
          }}
          onMouseLeave={() => {
            setShowToolTip(false);
          }}
        >
          {children}
        </ContainerOutlined>
      ) : (
        <Container
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={!conditional && { y: 2 }}
          size={size}
          bg={bg}
          color={color}
          onClick={handleFunction}
          disabled={conditional}
          circle={circle}
        >
          {children}
        </Container>
      )}
    </Cont>
  );
}
