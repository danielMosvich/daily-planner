import styled from "styled-components";
import Clock from "./clock";
import { useEffect, useState } from "react";
import CardTitle from "../texts/cardTitle";
import CardSubtitle from "../texts/cardSubtitle";
import Layout from "../modals/layout";
import PomodoroEditModal from "../modals/pomodoroEditModal";
import SelectTime from "./selectTime";
const Container = styled.div`
  display: grid;
  background-color: var(--fill-1);
  border-radius: 10px;
  box-shadow: var(--box-shadow-1);
  padding: 30px;
  gap: 10px;
  transition: background var(--transition-1), box-shadow var(--transition-1);
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  height: fit-content;
`;
export default function Pomodoro() {
  const [position, setPosition] = useState(0);
  const [time, setTime] = useState([
    {
      minutes: 25,
      seconds: 0,
      type:"Pomodoro"
    },
    {
      minutes: 5,
      seconds: 0,
      type:"short break"
    },
    {
      minutes: 10,
      seconds: 0,
      type:"long breake"
    },
  ]);
  const [isStart, setIsStart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  function changeTime(minutes) {
    setTime((prevTime) => {
      const newTime = [...prevTime]; // Crear una nueva matriz para no mutar la anterior
      newTime[position] = { ...newTime[position], minutes, seconds: 0 }; // Actualizar el objeto correspondiente en la matriz
      return newTime;
    });
  }
  function closeModal() {
    setShowModal(false);
  }
  function changePosition(p) {
    setPosition(p);
  }
  useEffect(()=>{
    if(localStorage.getItem("clock_times")){
      const localTimes = localStorage.getItem("clock_times")
      setTime(JSON.parse(localTimes))
    }
  },[])
  return (
    <Container>
      {showModal && (
        <Layout closeModal={closeModal} subtitle={"has to be in minutes"} title="Time select">
          <PomodoroEditModal
            changeTime={changeTime}
            time={time}
            setTime={setTime}
            closeModal={closeModal}
          ></PomodoroEditModal>
        </Layout>
      )}
      <Header>
        <CardTitle>Pomodoro Clock</CardTitle>
        <CardSubtitle>manage your time.</CardSubtitle>
      </Header>
      <SelectTime value={position} changePosition={changePosition} setIsStart={setIsStart} />
      {time && (
        <Clock
          minutes={time[position].minutes}
          seconds={time[position].seconds}
          showModal={setShowModal}
          isStart={isStart}
          setIsStart={setIsStart}
          type={time[position].type}
        />
      )}
    </Container>
  );
}
