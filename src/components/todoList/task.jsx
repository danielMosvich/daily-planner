/* eslint-disable react/prop-types */
import styled from "styled-components";
// import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CheckButton from "../buttons/checkButton";
import IconButton from "../buttons/iconButton";
const Li = styled(motion.li)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  border: 1px solid
    ${(props) => (props.status ? "var(--text-color-6)" : "transparent")};
  border-radius: 5px;
  background-color: ${(props) =>
    props.status ? "var(--fill-3)" : "var(--fill-1)"};
  transition: background-color var(--transition-1), border var(--transition-1),
    box-shadow var(--transition-1);
  &:hover {
    background-color: var(--fill-3);
    border: 1px solid var(--text-color-6);
    box-shadow: var(--box-shadow-2);
  }
  z-index: 5;
  cursor: ${(props) => (props.status ? "grab" : "normal")};
  /* cursor: ; */
`;
const TextContent = styled.div`
  padding: 0 10px;
  max-width: 100%;
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
`;
const Buttons = styled.div`
  height: 100%;
  display: flex;
  padding: 5px;
  gap: 5px;
`;
const Text = styled.p`
  position: relative;
  font-weight: 500;
  transition: var(--transition-1);
  color: ${(props) =>
    props.status === "checked" ? "var(--text-color-3)" : "var(--text-color-1)"};
  ${(props) =>
    props.status === "checked" &&
    `&::after{
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80%;
    height: 3px;
    background-color: var(--text-color-5);
    border-radius: 5px;
  }`}
  min-height: 40px;
  padding: 10px;
  word-break: keep-all;
  display: flex;
  align-items: center;
  font-size: var(--font-size-base);
`;
export default function Task({
  todo,
  moved,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDelete,
  changeChecked,
  setShowModal,
  setModalValue,
}) {
  const getRandomNumber = (min, max) => {
    return Math.random() * (min - max) + min;
  };
  const handleEdit = () => {
    setShowModal(true);
    setModalValue(todo);
  };
  return (
    <Li
      status={moved}
      initial={!moved && { scale: 0 }}
      animate={moved ? { rotate: [0.5, -0.5, 0.5] } : { rotate: 0, scale: 1 }}
      transition={
        moved
          ? {
              duration: getRandomNumber(0.4, 0.6),
              repeat: Infinity,
            }
          : {}
      }
      draggable={moved}
      onDragStart={(e) => handleDragStart(e, todo)}
      onDragOver={(e) => handleDragOver(e, todo)}
      onDragEnd={handleDragEnd}
    >
      <TextContent>
        <CheckButton
          todo={todo}
          status={todo.status}
          functionChange={changeChecked}
        />

        <Text>{todo.text}</Text>
      </TextContent>
      <Buttons>
        <IconButton size={30} anyFunction={handleEdit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </IconButton>
        <IconButton
          size={30}
          bg={"var(--color-red)"}
          color={"var(--color-red)"}
          anyFunction={() => handleDelete(todo.id)}
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
              d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
            />
          </svg>
        </IconButton>
      </Buttons>
    </Li>
  );
}
