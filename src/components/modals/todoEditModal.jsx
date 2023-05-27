import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
const Container = styled.div`
  /* margin-top: 20px; */
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* color: red; */
  input {
    width: 100%;
    padding: 10px;
    outline: none;
    border-radius: 5px;
    font-size: 1.1rem;
    font-weight: 500;
    border: 2px solid transparent;
    color: var(--text-color-1);
    transition: var(--transition-1);
    box-shadow: none;
    &:focus {
      box-shadow: var(--box-shadow-2);
      border: 2px solid var(--user-color-1);
    }
    background-color: var(--fill-modal-1);
  }
`;
const Buttons = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row-reverse;
  justify-content: space-between;
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
  &:hover{
    background-color: var(--user-color-2);
  }
  /* background-color: red; */
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
  &:hover{
    background-color: var(--color-red);
    color: white;
  }
`;
export default function TodoEditModal({ closeModal, data, anyFunction }) {
  const inputRef = useRef(null);
  const [task, setTask] = useState(data.text);

  function handleInput(e) {
    setTask(e.target.value);
  }
  function handleFunction() {
    const regex = /^(?=.*[^\s])[\s\S]*$/;
    if (!regex.test(task)) return;
    anyFunction(data.id, task);
    closeModal(false);
  }
  function handleKey({ key }) {
    if (key === "Enter") handleFunction();
  }
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Container>
      {/* xd */}
      <input
        type="text"
        value={task}
        ref={inputRef}
        onChange={handleInput}
        onKeyUp={handleKey}
      />
      <Buttons>
        <Button onClick={handleFunction}>
          <h3>Editar</h3>
        </Button>
        <ButtonDelete onClick={handleFunction}>
          <h3>Cancelar</h3>
        </ButtonDelete>
      </Buttons>
    </Container>
  );
}
