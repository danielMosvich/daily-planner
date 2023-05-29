import styled from "styled-components";

const Container = styled.section`
  background-color: var(--fill-1);
  box-shadow: var(--box-shadow-1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--fill-1);
    background: linear-gradient(
      0deg,
      #ffffff 20%,
      rgba(0, 0, 0, 0) 70%
    );
  }
`;
const Header = styled.div`
  background: rgb(218, 182, 252);
  background: var(--linear-gradient-3);
  width: 100%;
  height: 160px;
  position: relative;
`;
const AvatarBuble = styled.div`
  position: absolute;
  bottom: -60%;
  left: 30px;
  width: 150px;
  height: 150px;
  background-color: var(--fill-1);
  /* box-shadow: var(--box-shadow-1); */
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid var(--fill-1);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Main = styled.div`
  margin-top: 70px;
  /* background-color: red; */
  height: 100%;
`;
const ContainerTitle = styled.div`
  h2 {
    color: var(--text-color-2);
  }
  p {
    color: var(--text-color-3);
  }
  padding: 0 30px 30px;

  border-bottom: 1px solid var(--text-color-5);
`;
const Cards = styled.div`
  padding: 0 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding-top: 40px;
  border-radius: 0 0 10px 10px;
`;
const Card = styled.div`
  /* background-color: blue; */
  box-shadow: var(--box-shadow-1);
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  img {
    object-fit: contain;
    width: 100%;
    user-select: none;
    /* height: 100%; */
  }
`;

export default function DemostrationCard({
  
  // eslint-disable-next-line react/prop-types
  username = "user",
  // eslint-disable-next-line react/prop-types
  img = "./avatar.jpg",
}) {
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
  return (
    <Container>
      <Header>
        <AvatarBuble>
          <img src={img} alt="" />
        </AvatarBuble>
      </Header>
      <Main>
        <ContainerTitle>
          <h2>{username}</h2>
          <p>{days[day]} {dayNumber}, {months[month]}, {year}</p>
        </ContainerTitle>
        <Cards>
          <Card>
            <img src="./example-1.png" alt="" />
          </Card>
          <Card>
            <img src="./example-2.png" alt="" />
          </Card>
          {/* <Card>
            <img src="./example-3.png" alt="" />
          </Card> */}
        </Cards>
      </Main>
    </Container>
  );
}
