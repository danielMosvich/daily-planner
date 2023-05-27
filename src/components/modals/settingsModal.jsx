/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import IconContainer from "../miniComponents/iconContainer";
import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import AvatarEditorComponent from "../avatarEditor";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* overflow: auto; */
  h4 {
    color: var(--text-color-3);
  }
  section {
    background-color: var(--fill-modal-1);
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: var(--box-shadow-2);
  }
`;

const InputUsername = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: none;
  font-size: var(--font-size-base);
  color: var(--text-color-3);
  font-weight: 600;
  transition: color var(--transition-1);
  background-color: var(--fill-modal-1);
  &:focus {
    color: var(--text-color-1);
  }
`;
const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;
const ContainerCardsColor = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;
const Card = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid ${(props) => props.color};
  background: ${(props) => props.bg};
  color: white;
  stroke: white;
  fill: white;

  display: flex;
  flex-direction: column;
  gap: 5px;
  /* gap: 10px; */
  align-items: center;
  justify-content: space-evenly;
  p {
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: capitalize;
  }
`;
const CardColor = styled.div`
  background-color: ${(props) => props.bg};
  border: 2px solid ${(props) => props.bordercolor};
  /* padding: 10px; */
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  border-radius: 50%;
  font-weight: 500;
  color: white;
  cursor: pointer;
  user-select: none;
  transition: var(--transition-1);
  &:hover {
    background-color: ${(props) => props.bordercolor};
  }
`;
// !
const ImagenContent = styled.div`
  width: 100%;
  height: 310px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 2px dashed var(--text-color-5);
  box-shadow: var(--box-shadow-1);
  background-color: var(--fill-1);
  /* padding: 25px; */
  gap: 10px;
  /* cursor: pointer; */
  > input {
    display: none;
  }
  > p {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--text-color-4);
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  box-shadow: var(--box-shadow-1);
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
  box-shadow: var(--box-shadow-1);
  background-color: var(--fill-1);
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
  position: sticky;
  background-color: var(--fill-modal-1);
  box-shadow: var(--box-shadow-1);
  width: 100%;
  border-radius: 10px;
  padding: 25px 20px;
  /* backdrop-filter: blur(10px); */
  /* width: 100%; */
  bottom: -35px;
`;

const InputFiles = styled.div`
  background-color: var(--fill-1);
  padding: 15px;
  border-radius: 5px;
  box-shadow: var(--box-shadow-1);
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-color-3);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: color, border, var(--transition-1);
  svg {
    stroke: var(--text-color-3);
    transition: stroke var(--transition-1);
  }
  &:hover {
    border-color: var(--user-color-1);
    color: var(--user-color-1);

    svg {
      stroke: var(--user-color-1);
    }
  }
`;
export default function SettingsModal({
  setShowSettings,
  setThemes,
  colors,
  img,
  username,
  setImage,
  setUsername,
}) {
  const [url, setUrl] = useState(img);
  const [usernameChange, setUsernameChange] = useState(username);
  const [urlBase, setUrlBase] = useState(img);
  const inputFileRef = useRef(null);

  function handleUsername(e) {
    setUsernameChange(e.target.value);
  }
  function handleFile(e) {
    const file = e.target.files[0];
    if (file.size >= 1.5 * 1024 * 1024) {
      console.log("max 1.5mb");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUrl(reader.result);
      setUrlBase(reader.result);
    };
    reader.readAsDataURL(file);
  }
  function handleColor(color) {
    localStorage.setItem("color", color);
    document.documentElement.style.setProperty(
      "--user-color-1",
      colors[color].color_1
    );
    document.documentElement.style.setProperty(
      "--user-color-2",
      colors[color].color_2
    );
    document.documentElement.style.setProperty(
      "--user-color-5-active",
      colors[color].color_3
    );
    document.documentElement.style.setProperty(
      "--user-color-6-active",
      colors[color].color_4
    );
    document.documentElement.style.setProperty(
      "--user-color-3",
      colors[color].color_5
    );
  }
  function handleSetTheme(theme) {
    localStorage.setItem("theme", theme);
    setThemes(theme);
  }
  function verificarURL(url) {
    var expresionRegular = /^https?:\/\//;
    return expresionRegular.test(url);
  }
  useEffect(() => {
    // setUsername(localStorage.getItem("username"));
    // setUrlBase(localStorage.getItem("avatar"));
  }, []);
  return (
    <Container>
      <section>
        <h4>Foto de perfil</h4>
        <InputFiles
          onClick={() => {
            inputFileRef.current.click();
          }}
        >
          <IconContainer>
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
                d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </IconContainer>
          <p>importar imagen</p>
        </InputFiles>
        <ImagenContent>
          <input type="file" onChange={handleFile} ref={inputFileRef} />
          {urlBase ? (
            <AvatarEditorComponent
              img={urlBase}
              setUrlCanvas={setUrl}
              size={200}
              disabled={verificarURL(urlBase)}
            ></AvatarEditorComponent>
          ) : (
            <IconContainer size={50}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
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
          )}
          <p>Limite de 1.5MB</p>
        </ImagenContent>
      </section>

      <section>
        <InputUsername
          defaultValue={username}
          onChange={handleUsername}
        ></InputUsername>
      </section>
      <section>
        <h4>Theme</h4>
        <ContainerCards>
          <Card
            bg={"linear-gradient(145deg, #fddf7c, #dd8e44)"}
            color="#d4885c"
            onClick={() => {
              handleSetTheme("light");
            }}
          >
            <IconContainer size={30}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                //   stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </IconContainer>
            <p>light</p>
          </Card>
          <Card
            bg={"linear-gradient(145deg, #7791e9, #3345ac)"}
            color="#415492"
            onClick={() => {
              handleSetTheme("dark");
            }}
          >
            <IconContainer size={30}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                //   stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </IconContainer>
            <p>dark</p>
          </Card>
        </ContainerCards>
      </section>

      <section>
        <h4>Colors</h4>
        <ContainerCardsColor>
          <CardColor
            bg={"#ff3b30"}
            bordercolor={"#af2820"}
            onClick={() => {
              handleColor("red");
            }}
          >
            {/* <p>red</p> */}
          </CardColor>
          <CardColor
            bg={"#34c759"}
            bordercolor="#22863b"
            onClick={() => {
              handleColor("green");
            }}
          >
            {/* <p>green</p> */}
          </CardColor>
          <CardColor
            bg={"#0a84ff"}
            bordercolor="#084f96"
            onClick={() => {
              handleColor("blue");
            }}
          >
            {/* <p>blue</p> */}
          </CardColor>
          <CardColor
            bg={"#ff9f0a"}
            bordercolor="#c97a05"
            onClick={() => {
              handleColor("orange");
            }}
          >
            {/* <p>orange</p> */}
          </CardColor>
          <CardColor
            bg={"#ff375f"}
            bordercolor="#fa6785"
            onClick={() => {
              handleColor("pink");
            }}
          >
            {/* <p>pink</p> */}
          </CardColor>
          <CardColor
            bg={"#af52de"}
            bordercolor="#db93ff"
            onClick={() => {
              handleColor("purple");
            }}
          >
            {/* <p>purple</p> */}
          </CardColor>
          <CardColor
            bg={"#00c7be"}
            bordercolor="#0c817b"
            onClick={() => {
              handleColor("mint");
            }}
          >
            {/* <p>mint</p> */}
          </CardColor>
        </ContainerCardsColor>
      </section>

      <Buttons>
        <ButtonDelete
          onClick={() => {
            setShowSettings(false);
          }}
        >
          <h3>Cancelar</h3>
        </ButtonDelete>
        <Button
          onClick={() => {
            if (username !== "") {
              localStorage.setItem("username", usernameChange);
              localStorage.setItem("avatar", url);
              setImage(url);
              setUsername(usernameChange);
              setShowSettings(false);
            }
          }}
        >
          <h3>Guardar</h3>
        </Button>
      </Buttons>
    </Container>
  );
}
