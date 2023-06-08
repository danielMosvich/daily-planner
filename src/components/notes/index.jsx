import { styled } from "styled-components";
import CardTitle from "../texts/cardTitle";
import CardSubtitle from "../texts/cardSubtitle";
import { useState } from "react";
// import { filterProps } from "framer-motion";
import CardEdit from "./cardEdit";
import { useEffect } from "react";
const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: var(--fill-1);
  border-radius: 10px;
  box-shadow: var(--box-shadow-1);
  /* padding: 30px 0 40px; */
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: background var(--transition-1), box-shadow var(--transition-1);
  /* padding: 30px; */
`;
const Header = styled.div`
  padding: 30px 30px 0;
`;
const App = styled.div`
  padding: 0 30px 30px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-auto-rows:; */
  overflow: auto;
  gap: 20px;
`;
const Card = styled.div`
  position: relative;
  background-color: var(--fill-1);
  /* box-shadow: var(--box-shadow-4); */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid var(--text-color-6);
  transition: border var(--transition-1), box-shadow var(--transition-1);
  overflow: hidden;
  &:hover {
    box-shadow: var(--box-shadow-1);
    border: 2px solid var(--text-color-5);
  }
  h3 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: var(--font-size-base);
    color: var(--text-color-2);
  }
  h4 {
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--text-color-3);
    max-height: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* white-space: pre-line; */
  }
  p {
    font-size: var(--font-size-sm);
    color: var(--text-color-4);
  }
`;
const CardAdd = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 65px;
  height: 65px;
  color: var(--text-color-5);
  background-color: var(--fill-1);
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid var(--text-color-6);
  transition: border var(--transition-1), box-shadow var(--transition-1),
    color var(--transition-1);
  &:hover {
    border-color: var(--user-color-1);
    color: var(--user-color-1);
    box-shadow: var(--box-shadow-1);
  }
`;

const DeleteCard = styled.button`
  width: 30px;
  height: 30px;
  padding: 5px;
  border: none;
  background-color: var(--fill-1);
  color: var(--text-color-4);
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 50%;
  transition: var(--transition-1);
  &:hover {
    cursor: pointer;
    background-color: var(--color-red);
    color: white;
  }
`;

export default function Notes() {
  const [selectnote, setSelectNote] = useState({
    title: "",
    createated_at: "",
    data: "",
  });
  const [showAdd, setShowAdd] = useState(false);

  const [notes, setNote] = useState([
    { title: "Primera nota", createated_at: "", data: "edita el texto" },
  ]);

  function deleteCard(e, id) {
    e.stopPropagation();
    const newArray = [...notes];
    newArray.splice(id, 1);
    setNote(newArray);
    postLocalStorage(newArray);
  }
  function truncateText(text) {
    if (text.length <= 100) {
      return text;
    }
    const truncatedText = text.slice(0, 100) + "...";
    return truncatedText;
  }
  function postLocalStorage(array) {
    localStorage.setItem("notes", JSON.stringify(array));
  }
  useEffect(() => {
    if (localStorage.getItem("notes")) {
      setNote(JSON.parse(localStorage.getItem("notes")));
    }
  },[]);
  return (
    <Container>
      {showAdd && (
        <CardEdit
          selectnote={selectnote}
          setSelectNote={setSelectNote}
          showModal={setShowAdd}
          notes={notes}
          setNote={setNote}
          postLocalStorage={postLocalStorage}
        />
      )}
      <Header>
        <CardTitle>Sticky Notes</CardTitle>
        <CardSubtitle>Agrega tus notas y guardalas.</CardSubtitle>
      </Header>
      <App>
        {notes &&
          notes.map((e, i) => (
            <Card
              key={e.createated_at + i * 2}
              onClick={() => {
                setSelectNote({ ...e, index: i });
                setShowAdd(true);
              }}
            >
              <DeleteCard onClick={(e) => deleteCard(e, i)}>
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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </DeleteCard>
              <h3>{e.title}</h3>
              <h4>{truncateText(e.data)}</h4>
              <p>{e.createated_at}</p>
            </Card>
          ))}
        <CardAdd
          onClick={() => {
            setShowAdd(true);
          }}
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </CardAdd>
      </App>
    </Container>
  );
}
