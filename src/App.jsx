import "./App.css";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect, useRef, useState } from "react";
import AvatarEditorComponent from "./components/avatarEditor";
import IconContainer from "./components/miniComponents/iconContainer";
import DemostrationCard from "./components/demostrationCard";
import FooterDaniray from "./components/footerDaniray";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  background-color: var(--fill-1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  scroll-behavior: smooth;
`;
const ButtonGoogle = styled.div`
  background-color: var(--fill-1);
  box-shadow: var(--box-shadow-1);
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  border: 1px solid var(--text-color-5);
  cursor: pointer;
  transition: var(--transition-1);
  &:hover {
    border: 1px solid var(--user-color-1);
  }
  div {
    width: 20px;
    height: 20px;
    svg {
      width: 100%;
      height: 100%;
      display: block;
      fill: inherit;
      flex-shrink: 0;
      backface-visibility: hidden;
      margin-right: 6px;
    }
  }
  p {
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--text-color-3);
  }
  display: flex;
`;
const ImageGrid = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  background-image: url("grids.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.5;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(255, 0, 0);
    background: radial-gradient(
      circle,
      rgba(255, 0, 0, 0) 0%,
      rgba(255, 255, 255, 1) 90%
    );
  }
`;
const ContainerHeader = styled.div`
  display: flex;
  background: rgb(255, 255, 255);
  width: 100%;
`;
const Header = styled.header`
  max-width: 1100px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 3;
`;
const Title = styled.h2`
  font-size: var(--font-size-xxxl);
  text-align: center;
  font-weight: 900;
  @media (max-width:600px) {
    font-size: var(--font-size-xxl);
    padding: 0 20px;
  }
`;
const TitleColor = styled.b`
  font-weight: 900;
  text-align: center;
  font-size: var(--font-size-xxxl);
  background: rgb(0, 0, 0);
  background: var(--linear-gradient-1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
  @media (max-width:600px) {
    font-size: var(--font-size-xxl);
  }
`;
const Subtitle = styled.div`
  font-size: var(--font-size-md);
  font-weight: 400;
  text-align: center;
  padding: 0 1.5rem;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  color: var(--text-color-2);
  margin-top: 10px;
  @media (max-width:600px) {
    font-size: var(--font-size-base);
  }
`;
const ContainerStart = styled.div`
  display: flex;
  justify-content: center;
  /* margin: 0 30px; */
  margin-top: 50px;
  /* background-color: red; */
  padding: 0 20px;
  > div {
    max-width: 450px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;
const ButtonStart = styled.div`
  width: 100%;
  box-shadow: var(--box-shadow-1);
  padding: 15px 20px;
  background-color: var(--fill-opposite);
  border-radius: 5px;
  font-weight: 600;
  font-size: var(--font-size-base);
  color: var(--text-color-opposite);
  border: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: var(transition-1);

  &:hover {
    box-shadow: inset -10px -5px 30px #ffffff4e;
  }
`;
const Main = styled.main`
  scroll-behavior: smooth;
  background-color: var(--fill-2);
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 2px solid var(--text-color-5);
  @media (max-width:600px) {
    padding-bottom: 50px;
  }
`;
const ContainerTitleMain = styled.div`
  /* background-color: red; */
  padding: 20px 0 70px;
  h2 {
    font-family: var(--font-1);
    font-weight: 900;
    font-size: var(--font-size-xxxl);
    @media (max-width:600px) {
    font-size: var(--font-size-xxl);
  }
    span {
      @media (max-width:600px) {
    font-size: var(--font-size-xxl);
  }
      font-size: inherit;
      font-weight: 900;
      text-align: center;
      font-size: var(--font-size-xxxl);
      background: rgb(0, 0, 0);
      text-transform: capitalize;
      background: var(--linear-gradient-2);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    }
  }
`;
const MainContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  @media (max-width:600px) {
    grid-template-columns: 1fr;
    padding: 0 30px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* max-width: 500px; */
  width: 100%;
`;
// const FormTitle = styled.div`
//   h2 {
//     /* text-transform: capitalize; */
//     font-size: 1.3rem;
//     font-family: var(--font-2);
//     line-height: 100%;
//     font-weight: 500;
//     color: var(--text-color-3);
//   }
//   p {
//     font-family: var(--font-2);
//     border-bottom: 2px solid var(--text-color-5);
//     padding-bottom: 15px;
//     margin: 10px 5px;
//     font-size: var(--font-size-base);
//     color: var(--text-color-3);
//     font-weight: 500;
//   }
// `;
const FormInput = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const FormInputImport = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid var(--text-color-6);
  transition: var(--transition-1);
  box-shadow: var(--box-shadow-1);
  &:hover {
    p {
      transition: var(--transition-1);
      color: var(--user-color-1);
    }
    > p {
      border-right: 1px solid var(--user-color-1);
    }
    svg {
      transition: var(--transition-1);
    }
    border-color: var(--user-color-1);

    svg {
      stroke: var(--user-color-1);
    }
  }
`;
const InputTitle = styled.p`
  white-space: nowrap;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--fill-1);
  font-weight: 500;
  font-size: var(--font-size-base);
  border-radius: 5px 0 0 5px;
  transition: var(--transition-1);
  border-right: transparent;
  border: 1px solid
    ${(props) =>
      props.inputname === "true"
        ? "var(--user-color-1)"
        : "var(--text-color-5)"};
  color: ${(props) =>
    props.inputname === "true" ? "var(--user-color-1)" : "var(--text-color-3)"};
  box-shadow: var(--box-shadow-1);
`;
const InputTitleForm = styled.p`
  white-space: nowrap;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--fill-1);
  font-weight: 500;
  font-size: var(--font-size-base);
  border-radius: 5px 0 0 5px;
  transition: var(--transition-1);
  border-right: 1px solid var(--text-color-5);
`;
const InputForm = styled.input`
  width: 100%;
  border-radius: 0 5px 5px 0;
  padding: 10px 15px;
  font-size: var(--font-size-base);
  outline: none;
  box-shadow: var(--box-shadow-1);
  border: 1px solid var(--text-color-5);
  border-left: none;
  color: var(--text-color-2);
  font-weight: 500;
  transition: var(--transition-1);
  &:focus {
    border-color: var(--user-color-1);
    color: var(--text-color-1);
  }
  width: 100%;
  &::placeholder {
    color: var(--text-color-4);
  }
`;
const InputFormImport = styled.div`
  width: 100%;
  border-radius: 0 5px 5px 0;
  padding: 10px 15px;
  max-height: 42px;
  font-size: var(--font-size-base);
  box-shadow: var(--box-shadow-1);
  border-left: none;
  color: var(--text-color-2);
  font-weight: 500;
  transition: var(--transition-1);
  text-align: center;
  width: 100%;
  background-color: var(--fill-1);
  color: var(--text-color-4);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ImagenContent = styled.div`
  width: 100%;
  height: 360px;
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
  cursor: pointer;
  > input {
    display: none;
  }
  > p {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--text-color-4);
  }
`;
const ContainerCreate = styled.div`
  a {
    text-decoration: none;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  }
  width: 100%;
  display: flex;
  margin-top: 20px;
`;
const HeaderLink = styled.a`
  text-decoration: none;
  width: 100%;
`;
// !--------------------------------------
const Footer = styled.div`
  width: 100%;
  max-width: 1000px;
`;
// `;

function App() {
  const history = useNavigate();
  const clientID =
    "321436419898-q739vqo5t5la27cig0uf7a36sslc2dib.apps.googleusercontent.com";
  const [username, setUsername] = useState("Usuario");
  const [urlImage, setUrlImage] = useState();
  const [urlCanvas, setUrlCanvas] = useState();

  const [inputName, setInputName] = useState(false);
  const importRef = useRef(null);
  const inputNameRef = useRef(null);

  const handleRedirect = (url) => {
    history(url);
  };
  const hanndleRedirectComenzar = () => {
    if (username !== "") {
      localStorage.setItem("username", username);
      if (urlCanvas) localStorage.setItem("avatar", urlCanvas);
      history("/place");
    }
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
    // localStorage.setItem("username",e.target.value)
  };
  const handleUrlImage = (e) => {
    setUrlImage(e.target.value);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1.5 * 1024 * 1024) {
      console.log("max 1.5mb");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUrlImage(reader.result);
      setUrlCanvas(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const renderGoogleButton = ({ onClick }) => (
    <ButtonGoogle onClick={onClick}>
      <div>
        <svg viewBox="0 0 20 20">
          <g>
            <path
              d="M19.9996 10.2297C19.9996 9.54995 19.9434 8.8665 19.8234 8.19775H10.2002V12.0486H15.711C15.4823 13.2905 14.7475 14.3892 13.6716 15.0873V17.586H16.9593C18.89 15.8443 19.9996 13.2722 19.9996 10.2297Z"
              fill="#4285F4"
            ></path>
            <path
              d="M10.2002 20.0003C12.9518 20.0003 15.2723 19.1147 16.963 17.5862L13.6753 15.0875C12.7606 15.6975 11.5797 16.0429 10.2039 16.0429C7.54224 16.0429 5.28544 14.2828 4.4757 11.9165H1.08301V14.4923C2.81497 17.8691 6.34261 20.0003 10.2002 20.0003Z"
              fill="#34A853"
            ></path>
            <path
              d="M4.47227 11.9163C4.04491 10.6743 4.04491 9.32947 4.47227 8.0875V5.51172H1.08333C-0.363715 8.33737 -0.363715 11.6664 1.08333 14.4921L4.47227 11.9163Z"
              fill="#FBBC04"
            ></path>
            <path
              d="M10.2002 3.95756C11.6547 3.93552 13.0605 4.47198 14.1139 5.45674L17.0268 2.60169C15.1824 0.904099 12.7344 -0.0292099 10.2002 0.000185607C6.34261 0.000185607 2.81497 2.13136 1.08301 5.51185L4.47195 8.08764C5.27795 5.71762 7.53849 3.95756 10.2002 3.95756Z"
              fill="#EA4335"
            ></path>
          </g>
        </svg>
      </div>
      <p>Iniciar sesion con google</p>
    </ButtonGoogle>
  );
  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("avatar")) {
      // history(`/${localStorage.getItem("username")}`);
      history(`/place`);
    } else {
      document.title = "daily-planner";
    }
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);
  return (
    <Container>
      <ContainerHeader>
        <ImageGrid />
        <Header>
          <div>
            <Title>
              Organiza tus actividades con{" "}
              <TitleColor>Daily Planner</TitleColor>
            </Title>
          </div>

          <div>
            <Subtitle>
              Optimiza tu espacio de trabajo para aumentar tu productividad
              diaria. Transforma tu entorno laboral y maximiza tu eficiencia
              diaria.
            </Subtitle>
          </div>

          <ContainerStart>
            <div>
              <HeaderLink href="#main">
                <ButtonStart>Empieza ya, es gratis!</ButtonStart>
              </HeaderLink>
              <GoogleLogin
                clientId={clientID}
                onSuccess={({ profileObj }) => {
                  // console.log(profileObj);
                  handleRedirect(profileObj.name);
                  localStorage.setItem("username", `${profileObj.name}`);
                  localStorage.setItem("avatar", profileObj.imageUrl);
                }}
                render={renderGoogleButton}
              />
            </div>
          </ContainerStart>
        </Header>
      </ContainerHeader>
      <Main id="main">
        <ContainerTitleMain>
          <h2>
            Crea tu <span>cuenta!</span>
          </h2>
        </ContainerTitleMain>
        <MainContainer>
          <Form onSubmit={(e)=> e.preventDefault()}>
            {/* <FormTitle>
              <h2>Empiza a organizar tu tiempo.</h2>
            </FormTitle> */}
            <FormInput>
              <InputTitle inputname={inputName ? "true" : "false"}>
                Nombre
              </InputTitle>
              <InputForm
                ref={inputNameRef}
                onFocus={() => setInputName(true)}
                onBlur={() => setInputName(false)}
                type="text"
                placeholder={username}
                onChange={handleUsername}
              />
            </FormInput>
            <FormInputImport
              onClick={() => {
                importRef.current.click();
              }}
            >
              <InputTitleForm>Foto de perfil</InputTitleForm>
              <InputFormImport
                style={{ cursor: "pointer" }}
                onChange={handleUrlImage}
                placeholder="seleccionar archivo"
              >
                <p>seleccionar foto</p>
                <IconContainer size={25}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="var(--text-color-4)"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </IconContainer>
              </InputFormImport>
            </FormInputImport>
            <ImagenContent
              onClick={
                !urlImage
                  ? () => {
                      importRef.current.click();
                    }
                  : () => {}
              }
            >
              <input type="file" onChange={handleFileChange} ref={importRef} />
              {urlImage ? (
                <AvatarEditorComponent
                  img={urlImage}
                  setUrlCanvas={setUrlCanvas}
                />
              ) : (
                <>
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
                </>
              )}
              <p>Limite de 1.5MB</p>
            </ImagenContent>
            <ContainerCreate>
              <ButtonStart onClick={hanndleRedirectComenzar}>
                Comenzar
              </ButtonStart>
            </ContainerCreate>
          </Form>
          <DemostrationCard
            img={urlCanvas}
            username={username}
          ></DemostrationCard>
          {/* <SectionDemostration></SectionDemostration> */}
        </MainContainer>
      </Main>
      <Footer>
        <FooterDaniray></FooterDaniray>
      </Footer>
    </Container>
  );
}

export default App;
