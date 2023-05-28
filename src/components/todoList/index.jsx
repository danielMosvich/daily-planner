import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import confetti from "canvas-confetti";
import Task from "./task";
import CardTitle from "../texts/cardTitle";
import IconButton from "../buttons/iconButton";
import CardSubtitle from "../texts/cardSubtitle";
import Layout from "../modals/layout";
import TodoEditModal from "../modals/todoEditModal";
import InputTextIcon from "../inputs/inputTextIcon";
import ConfirmationModal from "../modals/confirmationModal";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--fill-1);
  border-radius: 10px;
  box-shadow: var(--box-shadow-1);
  h1 {
    font-size: 1.5rem;
  }
  transition: background var(--transition-1), box-shadow var(--transition-1);
`;
// !BAR________________________
const PorgressBar = styled.div`
  display: grid;
  gap: 10px;
`;
const Bar = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 15px;
  overflow: hidden;
  background-color: var(--fill-progress-bar-2);
  border: 1px solid var(--text-color-6);
  transition: background var(--transition-1);
`;
const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  font-weight: 500;
  color: var(--text-color-3);
  transition: color var(--transition-1);
  font-size: var(--font-size-base);
`;
const BarSpan = styled.div`
  background-color: var(--user-color-1);
  border-radius: 15px;
`;
// !LIST________________________
const ContainerUl = styled.div`
  max-height: 225px;
  min-height: 225px;
  overflow-x: clip;
  overflow-y: auto;
  padding: 10px 0 0;
`;
const Ul = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;
const ContainerContent = styled.div`
  padding: 30px 30px 0;
`;
const ContainerAllAdd = styled.div`
  width: 100%;
  padding: 20px;
`;
const ContainerListOptions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 10px 5px;
  gap: 10px;
`;
const TodoList = () => {
  const InputTextRef = useRef(null);
  const [todos, setTodos] = useState([]);
  // const [todo, setTodo] = useState("");
  const [draggedTodo, setDraggedTodo] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [moved, setMoved] = useState(false);
  const [forComplete, setForComplete] = useState("");

  const [shoModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const [movedPosible, setMovedPosible] = useState(false);

  const handleDelete = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
    handlePercentage(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  const handleEdit = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const handleDragStart = (e, todo) => {
    setDraggedTodo(todo);
  };

  const handleDragOver = (e, targetTodo) => {
    e.preventDefault();
    const updatedTodos = [...todos];
    const draggedTodoIndex = updatedTodos.findIndex(
      (todo) => todo.id === draggedTodo.id
    );
    const targetTodoIndex = updatedTodos.findIndex(
      (todo) => todo.id === targetTodo.id
    );
    updatedTodos.splice(draggedTodoIndex, 1);
    updatedTodos.splice(targetTodoIndex, 0, draggedTodo);
    setTodos(updatedTodos);
  };

  const handleDragEnd = () => {
    setDraggedTodo(null);
  };

  const changeChecked = (todo) => {
    const newStatus = todo.status === "pending" ? "checked" : "pending";
    if (todo.id === undefined) {
      return;
    }
    const updatedTodos = todos.map((t) => {
      return t.id === todo.id ? { ...t, status: newStatus } : t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    handlePercentage(updatedTodos, updatedTodos.length);
  };

  const handlePercentage = (todos) => {
    const totalTodos = todos.length;
    if (totalTodos === 0) {
      setPercentage(0);
      setForComplete("");
      return;
    }
    const checkedTodos = todos.filter((todo) => todo.status === "checked");
    const totalCheckedTodos =
      totalTodos > 0 ? Math.round((100 / totalTodos) * checkedTodos.length) : 0;
    setPercentage(totalCheckedTodos);
    setForComplete(`- ${checkedTodos.length} / ${totalTodos}`);
  };

  // const handleInput = (e) => {
  //   setTodo(e.target.value);
  // };

  // const handleSubmit = () => {
  //   const regex = /^(?=.*[^\s])[\s\S]*$/;
  //   if (!regex.test(todo)) return;
  //   const newTodos = [
  //     ...todos,
  //     {
  //       id: Date.now(),
  //       text: todo,
  //       status: "pending",
  //     },
  //   ];
  //   setTodos(newTodos);
  //   setTodo("");
  //   setMoved(false);
  //   handlePercentage(newTodos);
  //   InputTextRef.current.focus();
  // };
  // const handleKey = (e) => {
  //   e.key === "Enter" && handleSubmit();
  // };
  const handleMoved = () => {
    if (todos.length >= 2) {
      moved ? setMoved(false) : setMoved(true);
    }
  };

  function closeModal() {
    setShowModal(false);
  }
  useEffect(() => {
    if (localStorage.getItem("todos")) {
      const todosLocal = localStorage.getItem("todos");
      setTodos(JSON.parse(todosLocal));
    }
  }, []);
  useEffect(() => {
    todos.length < 2 && setMoved(false);
    todos.length >= 2 ? setMovedPosible(true) : setMovedPosible(false);
  }, [todos]);
  return (
    <Container>
      {/* MODAL FOR EDIT */}
      {shoModal && (
        <Layout closeModal={closeModal}>
          <TodoEditModal
            data={modalValue}
            anyFunction={handleEdit}
            closeModal={closeModal}
          />
        </Layout>
      )}
      {modalDelete && (
        <Layout
          closeModal={() => {
            setModalDelete(false);
          }}
          title="Eliminar todas las tareas"
        >
          <ConfirmationModal
          closeModal={()=>(setModalDelete(false))}
            text={"Estas seguro de eliminar todas las tareas?"}
            confirmbuttonText={"Eliminar"}
            anyFunction={() => {
              setTodos([]);
              handlePercentage([]);
              localStorage.removeItem("todos");
              setModalDelete(false)
            }}
          ></ConfirmationModal>
        </Layout>
      )}
      <ContainerContent>
        <CardTitle>lista de tareas</CardTitle>
        <CardSubtitle>agrega tu lista de tareas y completalas.</CardSubtitle>
        {/* BARRA DE PROGRESO */}
        <PorgressBar>
          <ProgressText>
            <div>
              <p>Progreso {forComplete}</p>
            </div>
            <div>{percentage}%</div>
          </ProgressText>
          <Bar>
            <BarSpan
              style={{
                width: `${percentage}%`,
                height: "100%",
                transition: "0.4s",
              }}
            ></BarSpan>
          </Bar>
        </PorgressBar>

        {/* LISTA DE OPCIONES DEL TO-DO */}
        <ContainerListOptions>
          <IconButton
            text="Mover tareas"
            size={32}
            outlined
            anyFunction={handleMoved}
            conditional={!movedPosible}
            bg={"var(--fill-2)"}
            // active={moved}
            tooltipButton
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
                d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"
              />
            </svg>
          </IconButton>
          <IconButton
            text="Eliminar tareas"
            size={32}
            outlined
            anyFunction={()=>{if(todos.length > 0 ) setModalDelete(true)}}
            // conditional={!todos.length > 0}
            bg={"var(--fill-2)"}
            // active={moved}
            tooltipButton
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </IconButton>
        </ContainerListOptions>

        {/* TO-DO */}
        <ContainerUl>
          <Ul>
            {todos.map((todo, i) => (
              <Task
                key={i}
                moved={moved}
                todo={todo}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDragEnd={handleDragEnd}
                handleDelete={handleDelete}
                changeChecked={changeChecked}
                setShowModal={setShowModal}
                shoModal={shoModal}
                setModalValue={setModalValue}
                modalValue={modalValue}
              />
            ))}
          </Ul>
        </ContainerUl>
      </ContainerContent>

      {/* CONTAINER PARA AGREGAR TAREAS */}
      <ContainerAllAdd>
        <InputTextIcon
          todos={todos}
          InputTextRef={InputTextRef}
          setTodos={setTodos}
          setMoved={setMoved}
          handlePercentage={handlePercentage}
        ></InputTextIcon>
      </ContainerAllAdd>
    </Container>
  );
};

export default TodoList;
