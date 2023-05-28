/* eslint-disable react/prop-types */
import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Container = styled(motion.div)`
  min-width: 100vw;
  min-height: 100vh;
  width: 100vw;
  height: 100vh;
  background-color: var(--fill-modal);
  position: fixed;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;

  top: 0;
  left: 0;
`;
const Modal = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: fit-content;
  max-height: 700px;
  max-width: 500px;
  border-radius: 10px;
  background-color: var(--fill-modal-2);
  padding: 25px;

  overflow: auto;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  text-transform: capitalize;
  font-weight: 700;
  color: var(--text-color-1);
`;
const Subtitle = styled.h3`
  font-size: 1rem;
  text-transform: capitalize;
  font-weight: 500;
  color: var(--text-color-3);
  padding: 0 2px;
`;
const Content = styled.div``;
const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: var(--fill-modal-1);
  color: var(--text-color-3);
  stroke: var(--text-color-3);
  border-radius: 50%;
  border: none;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color var(--transition-1);
  cursor: pointer;
  &:hover {
    color: var(--text-color-4);
    stroke: var(--text-color-4);
  }
`;
export default function Layout({
  title = "Modal select",
  subtitle,
  closeModal,
  children,
  initial,
  setComponentsArray,
}) {
  const [initialValues, setInitialValues] = useState(
    initial ? [...initial] : null
  );
  function closeFunction() {
    closeModal();
  }
  function intialFunction() {
    setComponentsArray(initialValues);
    closeModal();
  }

  return (
    <Container onClick={initial ? intialFunction : closeFunction}>
      <Modal
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ease: "backOut",
          duration: Number(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--transition-1-s"
            )
          ),
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ContainerHeader>
          <Head>
            <Title>{title}</Title>
            <CloseButton onClick={closeFunction}>
              <svg
                width="24px"
                height="24px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                // color="#000000"
              >
                <path
                  d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg> */}
            </CloseButton>
          </Head>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </ContainerHeader>
        <Content>{children}</Content>
      </Modal>
    </Container>
  );
}
