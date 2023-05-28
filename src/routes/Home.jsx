// import { useParams } from "react-router-dom";
// import Loader from "../components/loader";
import { useEffect, useState } from "react";

// *-------------------------------------------
import Pomodoro from "../components/pomodoro/index";
// import Pomodoro from "./components/pomodoro/index";
import styled from "styled-components";
// import theme from "./theme";
import PlayList from "../components/playList";
import TodoList from "../components/todoList/index";
import AddComponent from "../components/addComponent";
import Layout from "../components/modals/layout";
import AddComponentModal from "../components/modals/addComponentModal";
import SettingsModal from "../components/modals/settingsModal";
import { motion } from "framer-motion";
// import IconContainer from "../components/miniComponents/iconContainer";
import FooterDaniray from "../components/footerDaniray";
import Loader from "../components/loader";
import IconButton from "../components/buttons/iconButton";
import { useNavigate, useParams } from "react-router-dom";
import LogoutModal from "../components/modals/confirmationModal";
import IconContainer from "../components/miniComponents/iconContainer";
// *-------------------------------------------
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--fill-2);
  transition: background var(--transition-1);
  /* background-color: red; */
`;
const ContainerAll = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  max-width: 1050px;
  /* background-color: blue; */
  margin: 0 auto;
  padding: 0 20px 0;
  @media (max-width: 1000px) {
    padding: 0px;
  }
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--fill-1);
  display: flex;
  flex-direction: column;
  border-radius: 0 0 10px 10px;
  /* overflow: hidden; */
  box-shadow: var(--box-shadow-1);
  @media (max-width: 1000px) {
    border-radius: 0px;
  }
`;
const Header = styled.div`
  height: 150px;
  width: 100%;
  max-width: 100%;
  @media (max-width: 1000px) {
    /* max-width: 450px; */
  }
  background-color: var(--fill-1);
  /* box-shadow: var(--box-shadow-1); */
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  /* background-color: red; */
  /* overflow: hidden; */
`;
const ContainerInformation = styled.div`
  display: flex;
  position: relative;
  /* background-color: red; */
  @media (max-width: 1000px) {
    overflow-x: clip;
  }
`;
const ContainerText = styled.div`
  position: relative;
  z-index: 2;
  /* background-color: blue; */
  padding-top: 75px;
  padding-bottom: 30px;
  h2 {
    /* text-transform: capitalize; */
    /* max-width: 280px; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* font-size: 1.7rem; */
    font-size: var(--font-size-md-t);
    color: var(--text-color-1);
    font-weight: 700;
  }
  p {
    color: var(--text-color-3);
    /* font-size: 1rem; */
    font-size: var(--font-size-base);
    font-weight: 500;
  }
  span{
    color: var(--text-color-5);
    letter-spacing: 1px;
    font-size: var(--font-size-sm);
  }
`;
const HeaderContent = styled.div`
  /* background-color: pink; */
  width: 100%;
  padding: 0 30px;
`;
const ContainerImage = styled.div`
  outline: 6px solid var(--fill-1);
  position: absolute;
  top: -35%;
  z-index: 3;
  background-color: #989898;
  background-size: cover;
  background-position: 0 10px;
  background-repeat: no-repeat;

  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: clip;
  margin-bottom: 20px;
  cursor: pointer;

  img {
    /* border-radius: 50%; */
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: relative;
    z-index: 3;
  }
`;

const Buble1 = styled(motion.div)`
  position: absolute;
  background-color: var(--user-color-1);
  top: -50%;
  width: 400px;
  height: 400px;
  left: -10%;
  border-radius: 50%;
  opacity: var(--user-glow-opacity);
`;
const Buble2 = styled(motion.div)`
  position: absolute;
  background-color: var(--user-color-1);
  top: 50%;
  width: 400px;
  height: 400px;
  right: -20%;
  border-radius: 50%;
  opacity: var(--user-glow-opacity);
`;
const Buble3 = styled(motion.div)`
  position: absolute;
  background-color: var(--user-color-3);
  /* bottom: -100%; */
  width: 300px;
  height: 300px;
  right: 0;
  left: 0;
  margin: 0 auto;
  border-radius: 50%;
  opacity: var(--user-glow-opacity);
`;

const ContainerApps = styled.div`
  width: 100%;
  display: grid;
  gap: 40px;
  grid-template-columns: ${(props) =>
    props.components > 0
      ? "minmax(450px, 1fr) minmax(450px, 1fr)"
      : "minmax(450px, 0.5fr)"};
  grid-auto-rows: 525px;
  justify-content: center;

  @media (max-width: 1000px) {
    grid-template-columns: minmax(450px, 0.5fr);
  }
`;
// const SettingsButton = styled.button`
//   background-color: var(--fill-1);
//   border: 1px solid transparent;
//   border-radius: 5px;
//   padding: 5px;
//   box-shadow: var(--box-shadow-1);
//   stroke: var(--text-color-4);
//   transition: var(--transition-1);
//   /* margin: 20px; */
//   /* background-color:red; */
//   &:hover {
//     stroke: var(--text-color-3);
//     border: 1px solid var(--text-color-4);
//     box-shadow: var(--box-shadow-4);
//   }
// `;
const ContainerSettings = styled.div`
  z-index: 2;
  padding: 20px;
  @media (max-width: 1000px) {
    padding: 20px 40px;
  }
  gap: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;
const CardAdd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconEdit = styled.div`
  background-color: transparent;
  border: 1px solid var(--user-color-1);
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background var(--transition-1);
  svg {
    stroke: var(--user-color-1);
    transition: stroke var(--transition-1);
  }
  p {
    white-space: nowrap;
    font-weight: 600;
    color: var(--user-color-1);
    transition: color var(--transition-1);
  }
  &:hover {
    background-color: var(--user-color-1);

    svg {
      stroke: white;
    }
    p {
      color: white;
    }
  }
`;
// const Footer = styled.div`
//   width: 100%;
//   /* background-color: red; */
//   display: flex;
//   justify-content: center;
//   gap: 7rem;
//   @media (max-width: 1000px) {
//     gap: 3rem;
//     max-width: 450px;
//     margin: 0 auto;
//   }
//   a {
//     text-decoration: none;
//     cursor: pointer;
//     font-size: 0.8rem;
//     font-weight: 500;
//     color: var(--text-color-3);
//     display: flex;
//     gap: 10px;
//     align-items: center;
//   }
// `;
export default function Home() {
  const { user } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("username");
  const [img, setImage] = useState("");
  //   const username = " xd";

  const [loading, setLoading] = useState(true);
  const dayNumber = new Date().getDate();
  const day = new Date().getDay();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [themes, setThemes] = useState("light");
  const [components, setComponents] = useState([]);
  const [componentsArray, setComponentsArray] = useState([]);
  const [max, setMax] = useState("")


  const colors = {
    green: {
      color_1: "#34c759",
      color_2: "#22863b",
      color_3: "#34f5844d",
      color_4: "#35f09233",
      color_5: " #62ffa3",
    },
    red: {
      color_1: "#ff3b30",
      color_2: "#af2820",
      color_3: "#fa1b1b4d",
      color_4: "#ff6f6f33",
      color_5: " #ffa962",
    },
    blue: {
      color_1: "#0a84ff",
      color_2: "#084f96",
      color_3: "#52adf84d",
      color_4: "#6ecaff33",
      color_5: " #6272ff",
    },
    orange: {
      color_1: "#ff9f0a",
      color_2: "#c97a05",
      color_3: "#f8ab524d",
      color_4: "#ffc06e33",
      color_5: " #ff6c62",
    },
    pink: {
      color_1: "#ff375f",
      color_2: "#fa6785",
      color_3: "#ff375f4d",
      color_4: "#f5748e33",
      color_5: " #fc5c71",
    },
    purple: {
      color_1: "#af52de",
      color_2: "#db93ff",
      color_3: "#af52de4d",
      color_4: "#af52de33",
      color_5: " #7262ff",
    },
    mint: {
      color_1: "#00c7be",
      color_2: "#0c817b",
      color_3: "#00c7be4d",
      color_4: "#00c7be33",
      color_5: " #62ff7c",
    },
  };
  const handleTheme = (t) => {
    setThemes(t);
  };
  function handleSubmit(array) {
    const newArray = [];
    array.forEach((e) => {
      // console.log(e);
      if (e === "pomodoro") {
        newArray.push(<Pomodoro />);
      }
      if (e === "to-do list") {
        newArray.push(<TodoList />);
      }
      if (e === "playlist") {
        newArray.push(<PlayList />);
      }
    });
    setComponents(newArray);
    setShowModal(false);
  }
  useEffect(() => {
    let megabytes = Math.round(JSON.stringify(localStorage).length) / 1048576;
    setMax(Math.round(megabytes * 100) / 100 + "MB / 5.00MB");

    
    document.title = `${user}-Planner `;
    function handleLoad() {
      setLoading(false);
    }
    window.addEventListener("load", handleLoad);

    // if (user !== localStorage.getItem("username")) {
    //   navigate("/");
    // }
    if(!localStorage.getItem("username")){
      navigate("/")
    }

    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }

    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"));
    }
    if (localStorage.getItem("avatar")) {
      setImage(localStorage.getItem("avatar"));
    }
    // *-----------------------------------------
    if (localStorage.getItem("components")) {
      const componentsByStorage = JSON.parse(
        localStorage.getItem("components")
      );
      setComponentsArray(componentsByStorage);
      handleSubmit(componentsByStorage);
    }
    if (localStorage.getItem("color")) {
      const color = localStorage.getItem("color");
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
    if (localStorage.getItem("theme")) {
      const t = localStorage.getItem("theme");
      handleTheme(t);
    }
    return () => {
      window.removeEventListener("load", handleLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className={themes}>
      <Loader loading={loading} />
      {/*------------------------- CONTENIDO! iwi */}
      {showModal && (
        <Layout
          title="add component"
          subtitle={"select your component for your use."}
          closeModal={() => setShowModal(false)}
        >
          <AddComponentModal
            componentsArray={componentsArray}
            setComponentsArray={setComponentsArray}
            handleSubmit={handleSubmit}
            //
            closeModal={() => setShowModal(false)}
            setComponents={setComponents}
            setShowModal={setShowModal}
            components={components}
            // handleComponents={handleComponents}
          />
        </Layout>
      )}
      {showSettings && (
        <Layout closeModal={() => setShowSettings(false)} title="settings">
          <SettingsModal
            username={username}
            img={img}
            setUsername={setUsername}
            setImage={setImage}
            setShowSettings={setShowSettings}
            setThemes={setThemes}
            colors={colors}
          />
        </Layout>
      )}
      {showLogout && (
        <Layout
          closeModal={() => setShowLogout(false)}
          title="¿Quieres cerrar la sesion?"
        >
          <LogoutModal
            confirmbuttonText={"Cerrar Sesion"}
            text={"se borraran todo tus datos y no se podran recuperar."}
            closeModal={() => setShowLogout(false)}
            anyFunction={() => {
              localStorage.clear();
              document.documentElement.style.setProperty(
                "--user-color-1",
                colors.green.color_1
              );
              document.documentElement.style.setProperty(
                "--user-color-2",
                colors.green.color_2
              );
              document.documentElement.style.setProperty(
                "--user-color-5-active",
                colors.green.color_3
              );
              document.documentElement.style.setProperty(
                "--user-color-6-active",
                colors.green.color_4
              );
              document.documentElement.style.setProperty(
                "--user-color-3",
                colors.green.color_5
              );
              navigate("/");
            }}
          ></LogoutModal>
        </Layout>
      )}
      <ContainerAll>
        <ContainerHeader>
          <Header>
            <Buble1
              animate={{
                filter: [
                  "blur(150px) brightness(1)",
                  "blur(200px) brightness(1.5)",
                  "blur(150px) brightness(1)",
                ],
                top: ["50%", "-50%", "50%"],
              }}
              transition={{
                repeat: Infinity,
                ease: "easeInOut",
                duration: 15,
              }}
            />
            <Buble2
              animate={{
                filter: [
                  "blur(150px) brightness(1)",
                  "blur(200px) brightness(1.5)",
                  "blur(150px) brightness(1)",
                ],
                top: ["-50%", "50%", "-50%"],
              }}
              transition={{
                repeat: Infinity,
                ease: "easeInOut",
                duration: 10,
              }}
            />
            <Buble3
              animate={{
                filter: [
                  "blur(180px) brightness(1)",
                  "blur(200px) brightness(1.5) ",
                  "blur(180px) brightness(1)",
                ],
              }}
              transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
            />
          </Header>
          <ContainerInformation>
            <HeaderContent>
              <div>
                <ContainerImage>
                  <img src={img ? img : "./avatar.jpg"} />
                </ContainerImage>
                <ContainerText>
                  <h2>{username}</h2>
                  <p>
                    {days[day]} {dayNumber}, {months[month]}, {year} 🌸🌺
                  </p>
                  <span>{max}</span>
                </ContainerText>
              </div>
            </HeaderContent>
            <ContainerSettings>
              {/* <IconButton
                text="editar temas"
                tooltipButton
                size={40}
                outlined
                anyFunction={() => {
                  setShowSettings(true);
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
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
              </IconButton> */}
              <IconEdit onClick={() => setShowSettings(true)}>
                <IconContainer size={23}>
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </IconContainer>
                <p>Editar perfil</p>
              </IconEdit>
              {/* <IconButton
                text={"Editar perfil"}
                tooltipButton
                size={40}
                outlined
                anyFunction={() => {
                  setShowLogout(true);
                  // localStorage.clear()
                  // navigate("/")
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </IconButton> */}
              <IconButton
                text={"Cerrar sesion"}
                tooltipButton
                size={40}
                outlined
                bgOutlined={"var(--color-red)"}
                anyFunction={() => {
                  setShowLogout(true);
                  // localStorage.clear()
                  // navigate("/")
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
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </IconButton>
            </ContainerSettings>
          </ContainerInformation>
        </ContainerHeader>

        {/* APPS_-------------------------------- */}
        <ContainerApps components={components.length}>
          {components.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
          <CardAdd>
            <AddComponent anyFunction={setShowModal}></AddComponent>
          </CardAdd>
        </ContainerApps>
        <FooterDaniray></FooterDaniray>
      </ContainerAll>
    </Container>
  );
}
