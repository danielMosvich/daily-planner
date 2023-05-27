// import {  } from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--fill-2);
  position: fixed;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ContainerImage = styled.div`
  background-image: url(./avatar_layout.jpg);
  margin: 0 auto;
  display: flex;
  /* width: 100%; */
  justify-content: center;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  /* border: 1px solid var(--text-color-5); */
  box-shadow: var(--box-shadow-1);
  overflow: hidden;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: var(--transition-1);
  /* border: 2px solid var(--text-color-5); */
  outline: 3px solid var(--text-color-4);
  &:hover {
    outline: 3px solid var(--user-color-1);
    /* border: 2px solid var(--user-color-1); */
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
const ContainerForm = styled.div`
  border-radius: 10px;
  padding: 40px;
  background-color: var(--fill-1);
  box-shadow: var(--box-shadow-1);
  width: 450px;
  height: fit-content;
  max-width: 500px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  h2 {
    font-size: 2.5rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-color-2);
  }
`;
const ContainerTitle = styled.div`
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  p {
    text-transform: lowercase;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-color-3);
  }
  input {
    transition: border var(--transition-1);
    width: 100%;
    border-radius: 5px;
    padding: 10px;
    outline: none;
    border: 2px solid transparent;
    background-color: var(--fill-3);
    font-size: 1.1rem;
    font-weight: 500;
    &:focus {
      border-color: var(--user-color-1);
    }
  }
`;
const ContainerUrl = styled.div`
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  p {
    text-transform: lowercase;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-color-3);
  }
  input {
    transition: border var(--transition-1);
    width: 100%;
    border-radius: 5px;
    padding: 10px;
    outline: none;
    border: 2px solid transparent;
    background-color: var(--fill-3);
    font-size: 1.1rem;
    font-weight: 500;
    &:focus {
      border-color: var(--user-color-1);
    }
  }
`;
const ContainerFile = styled.div`
  border-radius: 10px;
  border: 2px dashed var(--text-color-5);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  /* padding: 40px 20px; */
  p {
      position: absolute;
      bottom: 30px;
      color: var(--text-color-3);
      font-size: 0.9rem;
      font-weight: 500;
    }
    button {
      /* cursor: pointer; */
    position: absolute;
    padding: 10px;
    /* background-color: var(--user-color-1); */
    /* background: var(--buble-gradient-3); */
    box-shadow: var(--box-shadow-1);
    border-radius: 5px;
    outline: none;
    border: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background var(--transition-1);
    &:hover {
      background-color: var(--user-color-2);
    }
  }
  input {
    cursor: pointer;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: red;
  }
`;
const ButtonSubmit = styled.button`
  border: none;
  background-color: var(--user-color-1);
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  color: white;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 2px;
  box-shadow: var(--box-shadow-1);
  transition: background var(--transition-1);
  cursor: pointer;
  &:hover {
    background-color: var(--user-color-2);
  }
  &:disabled{
    filter: grayscale(1);
    opacity: 0.4;
    cursor: default;
    &:hover{
        background-color: var(--user-color-1);
    }
  }
`;
export default function Profile({ setImgHome, setUsernameHome }) {
  const [img, setImg] = useState(null);
  const imgRef = useRef(null);
  const fileRef = useRef(null);
  const [userName, setUsername] = useState("");

  const [style, setStyle] = useState({
    backgroundColor: "var(--user-color-1)",
  });

  const handleUserName = (e) => {
    setUsername(e.target.value);
    localStorage.setItem("username", e.target.value);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1.5 * 1024 * 1024) {
      console.log("max 1.5mb");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      imgRef.current.value = "";
      //   setImg(null);
      setImg(reader.result);
      //   localStorage.setItem
      localStorage.setItem("avatar", reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleImg = (e) => {
    setImg(e.target.value);
    // setImgHome(e.target.value)
    // if (localStorage.getItem("avatarLoad")) {
    //   localStorage.removeItem("avatarLoad");
    // }
    localStorage.setItem("avatar", e.target.value);
  };
  const handleInputFile = () => {
    fileRef.current.click();
    // console.log(fileRef);
  };
  const showContent = () => {
    if (userName === "") return;
    if (img === "") return;
    // setDisplay("none");
    setUsernameHome(userName);
    setImgHome(img);
  };
  return (
    <Container>
      <ContainerForm>
        <h2>bienvenido!</h2>
        <ContainerTitle>
          <p>nombre de usuario</p>
          <input type="text" onChange={handleUserName} value={userName} />
        </ContainerTitle>
        <ContainerUrl>
          <p>url de avatar</p>
          <input ref={imgRef} type="text" onChange={handleImg} />
        </ContainerUrl>

        <ContainerFile style={{ display: !img ? "flex" : "none" }}>
          <button style={style}>subir avatar</button>
          <input
            type="file"
            ref={fileRef}
            onChange={handleFileChange}
            onMouseMove={() => {
              setStyle({ backgroundColor: "var(--user-color-2)" });
            }}
            onMouseLeave={() => {
              setStyle({ backgroundColor: "var(--user-color-1)" });
            }}
          />
          <p>tamaño maximo de archivos: 2MB</p>
        </ContainerFile>
        {img && (
          <ContainerImage onClick={handleInputFile}>
            {img && <img src={img} />}
            {/* {imgLoad && <img src={imgLoad} />} */}
          </ContainerImage>
        )}
        <ButtonSubmit disabled={img && userName ? false : true} onClick={showContent}>
          Crear
        </ButtonSubmit>
      </ContainerForm>
    </Container>
  );
}
