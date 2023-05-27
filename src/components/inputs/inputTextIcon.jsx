import { useState } from "react";
import styled from "styled-components";
const Container = styled.div`
  /* background-color: red; */
  border-radius: 5px;
  display: flex;
  box-shadow: var(--box-shadow-2);
  input {
    padding: 10px 15px;
    height: 100%;
    width: 100%;
    font-size: 1.1rem;
    font-weight: 500;
    outline: none;
    border: 1px solid var(--text-color-5);
    border-radius: 5px 0 0 5px;
    border-right: none;
    background-color: var(--fill-1);
    color: var(--text-color-2);
    transition: background var(--transition-1), border var(--transition-1);
  }
  /* background-color: red; */
`;
const Button = styled.button`
background-color: var(--fill-1);
  font-size: 1.07rem;
  font-weight: 500;
  color: var(--text-color-3);
  padding: 10px;
  border: 1px solid var(--text-color-5);
  border-left-color:transparent ;
  border-radius: 0 5px 5px 0;
  text-transform: capitalize;
  transition: var(--transition-1);
  &:hover{
    background-color: var(--fill-3);
    color: var(--text-color-2);
    border-left-color:var(--text-color-5);
  }
`;
export default function InputTextIcon({ InputTextRef, todos ,setTodos,setMoved,handlePercentage}) {
  const [task, setTask] = useState("");
  function handleTask(e) {
    setTask(e.target.value);
  }
  function handleSubmit() {
    const regex = /^(?=.*[^\s])[\s\S]*$/;
    if (!regex.test(task)) return;
    const newTodos = [
      ...todos,
      {
        id: Date.now(),
        text: task,
        status: "pending",
      },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos",JSON.stringify(newTodos))
    // setTodo("");
    setTask("");
    setMoved(false);
    handlePercentage(newTodos);
    InputTextRef.current.focus();
  }
  function handleKey({key}){
    if(key === "Enter"){
        handleSubmit()
    }
  }
  return (
    <Container>
      <input
      placeholder="Add task"
        ref={InputTextRef}
        type="text"
        onChange={handleTask}
        value={task}
        onKeyUp={handleKey}
      ></input>
      <Button onClick={handleSubmit}>agregar</Button>
    </Container>
  );
}
