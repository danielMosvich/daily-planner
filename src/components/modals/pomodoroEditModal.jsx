import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Card = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  input {
    margin-top: 10px;
    width: 100%;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    border: 1px solid transparent;
    outline: none;
    background-color: var(--fill-modal-1);
    color: var(--text-color-1);
    transition: box-shadow var(--transition-1), border var(--transition-1);
    &:focus {
      box-shadow: var(--box-shadow-2);
      border: 1px solid var(--user-color-1);
    }
  }
`;
const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color-2);
  text-transform: capitalize;
  /* color: red; */
`;
const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default function PomodoroEditModal({ time, setTime, closeModal }) {
  const [pomodoro, setPomodoro] = useState(time[0].minutes);
  const [short, setShort] = useState(time[1].minutes);
  const [long, setLong] = useState(time[2].minutes);

  function handlePomodoro(e) {
    setPomodoro(Number(e.target.value));
  }
  function handleShort(e) {
    setShort(Number(e.target.value));
  }
  function handleLong(e) {
    setLong(Number(e.target.value));
  }

  function handleSubmit() {
    if (pomodoro === 0) {
      return;
    }
    if (short === 0) {
      return;
    }
    if (long === 0) {
      return;
    }
    setTime([
      {
        minutes: pomodoro,
        seconds: 0,
        type: "Pomodoro",
      },
      {
        minutes: short,
        seconds: 0,
        type: "short breake",
      },
      {
        minutes: long,
        seconds: 0,
        type: "long breake",
      },
    ]);
    localStorage.setItem(
      "clock_times",
      JSON.stringify([
        {
          minutes: pomodoro,
          seconds: 0,
          type: "Pomodoro",
        },
        {
          minutes: short,
          seconds: 0,
          type: "short breake",
        },
        {
          minutes: long,
          seconds: 0,
          type: "long breake",
        },
      ])
    );
    closeModal();
  }
  return (
    <Container>
      {time && (
        <>
          <Card>
            <ContainerTitle>
              <Title>{time[0].type}</Title>
            </ContainerTitle>
            <input
              min={1}
              type="number"
              defaultValue={time[0].minutes}
              onChange={handlePomodoro}
            />
          </Card>
          <Card>
            <ContainerTitle>
              <Title>{time[1].type}</Title>
            </ContainerTitle>
            <input
              min={1}
              type="number"
              defaultValue={time[1].minutes}
              onChange={handleShort}
            />
          </Card>
          <Card>
            <ContainerTitle>
              <Title>{time[2].type}</Title>
            </ContainerTitle>
            <input
              min={1}
              type="number"
              defaultValue={time[2].minutes}
              onChange={handleLong}
            />
          </Card>
        </>
      )}
      <Buttons>
        <ButtonDelete onClick={closeModal}>
          <h3>Cancelar</h3>
        </ButtonDelete>
        <Button onClick={handleSubmit}>
          <h3>Guardar</h3>
        </Button>
      </Buttons>
    </Container>
  );
}
