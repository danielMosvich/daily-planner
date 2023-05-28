// import React from "react";
import styled from "styled-components";
import CardTitle from "../texts/cardTitle";
import CardSubtitle from "../texts/cardSubtitle";
// import PlayListCard from "./playlistCard";
import IconButton from "../buttons/iconButton";
import { useState } from "react";
import Layout from "../modals/layout";
import PlaylistModal from "../modals/playlistModal";
import PlaylistEdit from "../modals/playlistEdit";
import { useEffect } from "react";
import CarouselCards from "./carouselCards";
import "./carouselCreative.css";
import ConfirmationModal from "../modals/confirmationModal";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--fill-1);
  border-radius: 10px;
  box-shadow: var(--box-shadow-1);
  padding: 30px 0 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: background var(--transition-1), box-shadow var(--transition-1);
`;
const Header = styled.div`
  padding: 0 30px;
`;
const ContainerOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 30px;
  gap: 10px;
`;
function PlayList() {
  const [allPlaying, setAllPlaying] = useState(false);
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  // const [deleteFunction, setDeleteFunction] = useState(null)
  const [playlist, setPlaylist] = useState({
    title: "",
    valume: 0.5,
    url: "",
    image: "",
    index: null,
  });
  const [songs, setSongs] = useState([
    {
      title: "loading",
    },
  ]);
  const songsDefault = [
    {
      title: "lofi hip hop",
      volume: 0.5,
      url: "https://youtu.be/lTRiuFIWV54?t=16",
      image:
        "https://i.pinimg.com/564x/12/50/e1/1250e1749717d39c704751763895f31d.jpg",
    },
    {
      title: "rain",
      volume: 0.5,
      url: "https://youtu.be/yIQd2Ya0Ziw?t=1",
      image:
        "https://i.pinimg.com/564x/18/05/b5/1805b51afb5a83dc6d5eb4c07c7470de.jpg",
    },
    {
      title: "ASMR",
      volume: 0.5,
      url: "https://www.youtube.com/watch?v=lHZ2azw5LCc",
      image:
        "https://i.pinimg.com/564x/d1/b8/25/d1b8255c900f51f3ee915ec4d5cf1042.jpg",
    },
    {
      title: "forest",
      volume: 0.5,
      url: "https://youtu.be/_GTkDRvN9b0?t=1",
      image:
        "https://i.pinimg.com/564x/94/5b/41/945b416397f9a5ed69044e0325066b1f.jpg",
    },
  ];
  useEffect(() => {
    setSongs([...songsDefault]);
    if (localStorage.getItem("songs") === null) {
      setSongs(songsDefault);
      localStorage.setItem("songs", JSON.stringify(songsDefault));
    }

    if (localStorage.getItem("songs")) {
      const parseSongs = JSON.parse(localStorage.getItem("songs"));
      setSongs(parseSongs);
    }
  }, []);
  return (
    <Container>
      {showModalEdit && (
        <Layout
          title="Editar"
          closeModal={() => {
            setShowModalEdit(false);
            setShowModal(true);
          }}
        >
          <PlaylistEdit
            playlist={playlist}
            setPlaylist={setPlaylist}
            setShowModal={setShowModal}
            setShowModalEdit={setShowModalEdit}
            songs={songs}
            setSongs={setSongs}
          ></PlaylistEdit>
        </Layout>
      )}
      {showModal && (
        <Layout
          title="Agrega tu musica / playlist"
          closeModal={() => {
            setShowModal(false);
          }}
        >
          <PlaylistModal
            playlist={playlist}
            setPlaylist={setPlaylist}
            setSongs={setSongs}
            songs={songs}
            setShowModal={setShowModal}
            setShowModalEdit={setShowModalEdit}
            setShowModalConfirmation={setShowModalConfirmation}
          />
        </Layout>
      )}
      {showModalConfirmation && (
        <Layout
          title="Eliminar tu Music Card"
          closeModal={() => {
            setShowModalConfirmation(false);
            setShowModal(true)
          }}
        >
          <ConfirmationModal
            closeModal={() => {
              setShowModalConfirmation(false);
              setShowModal(true);
            }}
            text={"ya no se podra recuperar la musica."}
            confirmbuttonText={"Eliminar"}
            anyFunction={() => {
              // console.log(playlist);
              let newArray = [...songs];
              newArray.splice(playlist.index, 1);
              setSongs(newArray);
              localStorage.setItem("songs", JSON.stringify(newArray));
              setPlaylist({
                title: "",
                valume: 0.5,
                url: "",
                image: "",
                index: null,
              });
              setShowModalConfirmation(false);
              setShowModal(true);
            }}
          ></ConfirmationModal>
        </Layout>
      )}
      <Header>
        <CardTitle>Selecciona tu musica</CardTitle>
        <CardSubtitle>cambia o agrega tu musica / playlist.</CardSubtitle>
      </Header>
      <ContainerOptions>
        <IconButton
          size={32}
          outlined
          text={"pausar todas las canciones"}
          tooltipButton
          bgOutlined={"var(--color-red)"}
          anyFunction={() => {
            console.log("xd pause");
            setAllPlaying(true);
            // setAllPlaying(false);
            setTimeout(() => {
              setAllPlaying(false);
            }, 100);
          }}
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
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        </IconButton>
        <IconButton
          size={32}
          outlined
          text={"agregar musica"}
          tooltipButton
          anyFunction={() => {
            setShowModal(true);
          }}
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </IconButton>
      </ContainerOptions>
      {/* <CarouselCreative songs={songs}/> */}
      <CarouselCards
        songs={songs}
        allPlaying={allPlaying}
        setAllPlaying={setAllPlaying}
      />
    </Container>
  );
}
export default PlayList;
