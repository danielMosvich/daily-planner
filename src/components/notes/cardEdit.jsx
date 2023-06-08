/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";
const NotesEdit = styled(motion.div)`
  position: absolute;
  background-color: var(--fill-1);
  padding: 30px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
  z-index: 5;
`;
const TextAreaTitle = styled.textarea`
  margin-top: 20px;
  background-color: var(--fill-1);
  color: var(--text-color-2);
  resize: none;
  font-size: var(--font-size-md);
  font-weight: 600;
  border: none;
  overflow: hidden;
  &::placeholder {
    color: var(--text-color-4);
  }
  line-height: 120%;
`;
const TextAreaData = styled.textarea`
  background-color: var(--fill-1);
  width: 100%;
  color: var(--text-color-3);
  resize: none;
  font-size: var(--font-size-base);
  font-weight: 500;
  max-height: 300px;
  height: 100%;
  border: none;
  &::placeholder {
    color: var(--text-color-4);
  }
  /* padding-top: 10px; */
  /* line-height: 10%; */
`;

const HeaderNote = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const ButtonCheck = styled.button`
  background-color: var(--fill-1);
  stroke: var(--text-color-4);
  padding: 3px;
  width: 40px;
  height: 40px;
  color: white;
  border-radius: 5px;
  border: none;
  transition: var(--transition-1);
  cursor: pointer;
  &:hover {
    background-color: var(--user-color-1);
    stroke: white;
  }
`;
const ButtonDelete = styled.button`
  background-color: var(--fill-1);
  stroke: var(--text-color-4);
  border-radius: 5px;
  padding: 5px;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  border: none;
  transition: var(--transition-1);
  cursor: pointer;
  &:hover {
    background-color: var(--color-red);
    stroke: white;
  }
`;
export default function CardEdit({
  selectnote,
  showModal,
  notes,
  setNote,
  setSelectNote,
  postLocalStorage,
}) {
  const titleRef = useRef();
  const [titleText, setTitle] = useState("");
  const [dataText, setDataText] = useState("");
  function handleTitle(e) {
    if (titleText.length <= 120) {
      setTitle(e.target.value);
    }
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }
  function handleData(e) {
    setDataText(e.target.value);
  }
  const adjustTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };
  useEffect(() => {
    setTitle(selectnote.title);
    setDataText(selectnote.data);
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  }, []);
  return (
    <NotesEdit
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <HeaderNote>
        <ButtonCheck
          onClick={() => {
            if (titleText !== "" || dataText !== "") {
              if (selectnote.index !== "") {
                const newArray = [...notes];
                const filterArray = newArray.filter(
                  (e, i) => i !== selectnote.index
                );
                const fecha = new Date();
                const dia = fecha.getDate();
                const mes = fecha.getMonth();
                const year = fecha.getFullYear();
                filterArray.splice(selectnote.index, 0, {
                  ...selectnote,
                  data: dataText,
                  title: titleText,
                  createated_at: `${dia}-${mes}-${year}`,
                });
                setNote(filterArray);
                showModal(false);
                setSelectNote({
                  title: "",
                  createated_at: "",
                  data: "",
                  index: "",
                });
                postLocalStorage(filterArray);
              } else {
                const newArray = [...notes];
                const fecha = new Date();
                const dia = fecha.getDate();
                const mes = fecha.getMonth();
                const year = fecha.getFullYear();
                newArray.push({
                  data: dataText,
                  title: titleText,
                  createated_at: `${dia}-${mes}-${year}`,
                });
                setNote(newArray);
                showModal(false);
                setSelectNote({
                  title: "",
                  createated_at: "",
                  data: "",
                  index: "",
                });
                // setTitle("");
                // setDataText("");
                postLocalStorage(newArray);
              }
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
        </ButtonCheck>
        <ButtonDelete
          onClick={() => {
            showModal(false);
            setSelectNote({
              title: "",
              createated_at: "",
              data: "",
              index: "",
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            // stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </ButtonDelete>
      </HeaderNote>
      <TextAreaTitle
        placeholder="Title"
        defaultValue={selectnote.title}
        onChange={handleTitle}
        maxLength={120}
        ref={titleRef}
      ></TextAreaTitle>
      <TextAreaData
        placeholder="ingresa la nota aqui"
        defaultValue={selectnote.data}
        onChange={handleData}
        onInput={adjustTextareaHeight}
        rows={1}
      ></TextAreaData>
    </NotesEdit>
  );
}
