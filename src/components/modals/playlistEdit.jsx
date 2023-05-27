/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import IconContainer from "../miniComponents/iconContainer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Section = styled.section`
  h4 {
    font-size: 1rem;
    font-weight: 600;
    text-transform: capitalize;
    color: var(--text-color-2);
  }

  input {
    background-color: var(--fill-modal-1);
    color: var(--text-color-3);
    margin-top: 10px;
    width: 100%;
    padding: 10px 15px;
    font-size: 0.95rem;
    border-radius: 5px;
    outline: none;
    border: 1px solid transparent;
    &:focus {
      color: var(--text-color-1);
      border-color: var(--user-color-1);
      box-shadow: var(--box-shadow-2);
    }
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

// const DeleteButton = styled.button`

// `
export default function PlaylistEdit({
  setShowModal,
  setShowModalEdit,
  playlist,
  setPlaylist,
  songs,
  setSongs,
}) {
  const [filterSongs, setFilterSongs] = useState();
  const [title, setTitle] = useState(playlist.title);
  const [url, setUrl] = useState(playlist.url);
  const [image, setImage] = useState(playlist.image);

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleUrl(e) {
    setUrl(e.target.value);
  }
  function handleImage(e) {
    setImage(e.target.value);
  }
  function submit() {
    const newSongs = [...filterSongs];
    if (playlist.index === null) {
      newSongs.push({
        title,
        url,
        image,
        description: "",
        index: playlist.index,
      });
    } else {
      newSongs.splice(playlist.index, 0, {
        title,
        url,
        image,
        description: "",
        index: playlist.index,
      });
    }
    setSongs(newSongs);
    setPlaylist({
      title: "",
      valume: 0.5,
      url: "",
      image: "",
      index: null,
    });
    localStorage.setItem("songs", JSON.stringify(newSongs));
  }
  useEffect(() => {
    const newSongs = [...songs];
    const filterSongs = newSongs.filter((e) => e.title !== title);
    setFilterSongs(filterSongs);
  }, []);
  return (
    <Container>
      <Section>
        <h4>Titulo</h4>
        <input type="text" value={title} onChange={handleTitle} />
      </Section>
      <Section>
        <h4>url de cancion / playlist</h4>
        <input type="text" value={url} onChange={handleUrl} />
      </Section>
      <Section>
        <h4>url de imagen</h4>
        <input type="text" value={image} onChange={handleImage} />
      </Section>
      <Buttons>
        <Button
          onClick={() => {
            if (title === "" && url === "" && image === "") {
              return;
            }
            setShowModalEdit(false);
            setShowModal(true);
            submit();
          }}
        >
          <h3>guardar</h3>
        </Button>
        <ButtonDelete
          onClick={() => {
            setShowModalEdit(false);
            setShowModal(true);
            setPlaylist("");
          }}
        >
          <h3>cancelar</h3>
        </ButtonDelete>
      </Buttons>
    </Container>
  );
}
