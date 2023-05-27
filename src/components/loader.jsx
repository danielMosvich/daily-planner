/* eslint-disable react/prop-types */
// import { css } from "@emotion/css";
import styled from "styled-components";
import { useEffect, useState } from "react";
// import IconContainer from "./miniComponents/iconContainer";

const Container = styled.div`
  background-color: var(--fill-2);
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: ${(props) => props.show};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  opacity: ${(props) => props.opacity};
  transition: opacity var(--transition-1);
  z-index: 20;
  h2 {
    font-size: var(--font-size-lg);
    text-transform: capitalize;
    color: var(--text-color-2);
  }
`;
const LoaderMove = styled.div`
  width: 200px;
  height: 30px;
  border: 3px solid var(--logo-color-2);
  border-radius: 15px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    margin: 3px;
    border-radius: inherit;
    background-color: var(--logo-color-1);

    animation-name: load;
    animation-duration: 3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    @keyframes load {
      0% {
        inset: 0 87% 0 0;
      }
      100% {
        inset: 0;
      }
    }
  }
`;
const ContainerIcon = styled.div`
  /* background-color: red; */
  max-width: 200px;
  width: 200px;
  display: flex;
  justify-content: center;
  /* box-shadow: var(--box-shadow-1); */

  img {
    /* padding: 10px; */
    /* background-color: red; */
    width: 40%;
    /* overflow: visible; */
    display: flex;
  }
  /* height: 100%; */
`;
export default function Loader({ loading }) {
  const [show, setShow] = useState("flex");
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    if (!loading) {
      setOpacity(0);
      // console.log("GG");
    }
    if (opacity === 0) {
      setTimeout(() => {
        setShow("none")
        window.scroll(0,0)
      }, 500);
    }
  }, [loading, opacity]);
  return (
    <Container opacity={opacity} show={show}>
      <ContainerIcon>
        <img src="./vite.svg" alt="" />
      </ContainerIcon>
      {/* </IconContainer> */}
      {/* <h2>loading</h2> */}
      <LoaderMove></LoaderMove>
    </Container>
  );
}
