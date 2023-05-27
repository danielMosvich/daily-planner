/* eslint-disable react/prop-types */
import styled from "styled-components";
import IconContainer from "../miniComponents/iconContainer";
// import Layout from "./layout";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  /* max-height: 600px; */
`;
const Section = styled.div`
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  h3 {
    text-transform: capitalize;
    font-size: 1.3rem;
  }
  overflow: hidden;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 40px 20px;
  color: white;
  cursor: pointer;
  position: relative;
`;
const SectionAdd = styled.div`
  background-color: var(--fill-modal-1);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: var(--box-shadow-2);
`;
const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  border: none;
  padding: 6px;
  background-color: var(--fill-5);
  transition: background var(--transition-1);
  cursor: pointer;
  svg {
    color: var(--text-color-3);
    stroke: var(--text-color-3);
  }
  &:hover {
    background-color: var(--color-red);
    svg {
    color: white;
    stroke: white;
  }
  }
`;
export default function PlaylistModal({
  songs,
  setShowModal,
  setShowModalEdit,
  setPlaylist,
  setSongs,
}) {
  return (
    <Container>
      {songs.map((e, i) => (
        <Section
          key={i}
          image={e.image}
          onClick={() => {
            setShowModalEdit(true);
            setShowModal(false);
            setPlaylist({ ...e, index: i });
          }}
        >
          <Content>
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                let newArray = [...songs];
                newArray.splice(i, 1);
                setSongs(newArray);
              }}
            >
              <IconContainer size={20}>
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
              </IconContainer>
            </DeleteButton>
            <h3>{e.title}</h3>
          </Content>
        </Section>
      ))}
      <SectionAdd
        onClick={() => {
          setShowModalEdit(true);
          setShowModal(false);
          setPlaylist({
            title: "",
            valume: 0.5,
            url: "",
            image: "",
            index: null,
          });
        }}
      >
        <IconContainer size={60}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="var(--text-color-5)"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </IconContainer>
      </SectionAdd>
    </Container>
  );
}
