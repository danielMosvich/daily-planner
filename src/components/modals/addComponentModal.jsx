/* eslint-disable react/prop-types */
import styled from "styled-components";
import IconContainer from "../miniComponents/iconContainer";
import { useState } from "react";

const Container = styled.div``;
const ContainerCards = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(130px, 1fr);
`;
const Card = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: var(--box-shadow-1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: var(--fill-modal-1);
  background: ${(props) => props.status === "true" && props.bg};
  cursor: pointer;
  user-select: none;
  color: ${(props) => (props.status === "true" ? "white" : "var(--text-color-3)")};
  fill: ${(props) => (props.status === "true" ? "white" : "var(--text-color-3)")};
  stroke: ${(props) => (props.status === "true" ? "white" : "var(--text-color-3)")};
  h3 {
    font-size: 1rem;
    text-align: center;
    text-transform: capitalize;
  }
`;
const Iconbuble = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  top: 10px;
  right: 10px;
  box-shadow: ${(props) => props.status === "true" && "0 4px 5px #00000049"};
  background-color: ${(props) =>
    props.status === "true" ? "var(--color-red)" : "transparent"};
  transition: background var(--transition-1), color, var(--transition-1);
  border-radius: 50%;
  color: ${(props) => (props.status === "true" ? "white" : "transparent")};
`;
const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0 0;
`;
const ButtonDelete = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  box-shadow: var(--box-shadow-2);
  background-color: var(--fill-modal-1);
  color: var(--text-color-3);
  cursor: pointer;
  transition: color var(--transition-1), background var(--transition-1);
  h3 {
    font-weight: 600;
    text-transform: capitalize;
    font-size: 1rem;
  }
  &:hover {
    background-color: var(--color-red);
    color: white;
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  box-shadow: var(--box-shadow-2);
  background-color: var(--user-color-1);
  color: white;
  cursor: pointer;
  transition: color var(--transition-1), background var(--transition-1);
  h3 {
    font-weight: 600;
    text-transform: capitalize;
    font-size: 1rem;
  }
  &:hover {
    background-color: var(--user-color-2);
  }
`;
export default function AddComponentModal({
  handleSubmit,
  componentsArray,
  setComponentsArray,
  closeModal,
  
}) {
  const [initialArray, setInitialArray] = useState([...componentsArray])
  function setLocalStorage(array) {
    localStorage.setItem("components", JSON.stringify(array));
  }
  function addComponents(type) {
    if (componentsArray.some((e) => e === type)) {
      const newArrayDelete = componentsArray.filter(
        (element) => element !== type
      );
      setComponentsArray(newArrayDelete);
      setLocalStorage(newArrayDelete);
      return;
    }
    const newArray = [...componentsArray];
    newArray.push(type);
    setComponentsArray(newArray);
    // setLocalStorage(newArray);
  }

  return (
    <Container>
      <ContainerCards>
        <Card
          bg={"var(--buble-gradient-1)"}
          status={componentsArray.some((e) => e === "pomodoro") ? "true" : "false"}
          onClick={() => {
            addComponents("pomodoro");
          }}
        >
          <Iconbuble status={componentsArray.some((e) => e === "pomodoro") ? "true" : "false"}>
            {componentsArray.findIndex((e) => e === "pomodoro") + 1 > 0 &&
              componentsArray.findIndex((e) => e === "pomodoro") + 1}
          </Iconbuble>
          <IconContainer size={60}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              // fill={(listComponents.some((e) => e === "to-do list")) ? "red" : "blue"}
              className="w-6 h-6"
              stroke="none"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                clipRule="evenodd"
              />
            </svg>
          </IconContainer>
          <h3>pomodoro</h3>
        </Card>
        <Card
          bg={"var(--buble-gradient-2)"}
          status={componentsArray.some((e) => e === "to-do list") ? "true" : "false"}
          onClick={() => {
            addComponents("to-do list");
          }}
        >
          <Iconbuble status={componentsArray.some((e) => e === "to-do list") ? "true" : "false"}>
            {componentsArray.findIndex((e) => e === "to-do list") + 1 > 0 &&
              componentsArray.findIndex((e) => e === "to-do list") + 1}
          </Iconbuble>
          <IconContainer size={60}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              // stroke="none"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </IconContainer>
          <h3>lista de tareas</h3>
        </Card>
        <Card
          bg={"var(--buble-gradient-3)"}
          status={componentsArray.some((e) => e === "playlist") ? "true" : "false"}
          onClick={() => {
            addComponents("playlist");
          }}
        >
          <Iconbuble status={componentsArray.some((e) => e === "playlist") ? "true" : "false"}>
            {componentsArray.findIndex((e) => e === "playlist") + 1 > 0 &&
              componentsArray.findIndex((e) => e === "playlist") + 1}
          </Iconbuble>
          <IconContainer size={60}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              // fill="currentColor"
              className="w-6 h-6"
              stroke="none"
            >
              <path
                fillRule="evenodd"
                d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z"
                clipRule="evenodd"
              />
            </svg>
          </IconContainer>
          <h3>playlist</h3>
        </Card>
      </ContainerCards>

      <ContainerButtons>
        <ButtonDelete onClick={()=>{
          handleSubmit(initialArray)
          setComponentsArray(initialArray)
        }}>
          <h3>cancelar</h3>
        </ButtonDelete>
        <Button
          onClick={() => {
            handleSubmit(componentsArray);
            setLocalStorage(componentsArray)
            setInitialArray([])
          }}
        >
          
          <h3>agregar</h3>
        </Button>
      </ContainerButtons>
    </Container>
  );
}
