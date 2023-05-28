/* eslint-disable react/prop-types */
import styled from "styled-components";

const Container = styled.nav`
  background-color: var(--fill-a-3);
  margin: 0 auto;
  display: flex;
  padding: 5px;
  border-radius: 5px;
  width: fit-content;
  height: fit-content;
  position: relative;
  transition: var(--transition-1);
`;
const Background = styled.div`
  display: flex;
  gap: 5px;
  border-radius: 5px;
`;
const Option = styled.div`
  background-color: ${(props) =>
    props.active === "true" ? "var(--fill-a-1)" : "transparent"};
  padding: 5px 10px;
  border-radius: 5px;
  transition: background var(--transition-1), border var(--transition-1),
    color var(--transition-1), box-shadow var(--transition-1);
  ${(props) => props.active === "true" && "box-shadow:var(--box-shadow-4);"}
  border: ${(props) =>
    props.active === "true" ? "1px solid var(--text-color-a-5)" : "1px solid transparent"};
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: ${(props) =>
    props.active === "true" ? "var(--text-color-2)" : "var(--text-color-3)"};
`;
const SelectTime = ({value,changePosition,setIsStart}) => {
    function handlePosition(p){
        changePosition(p)
        setIsStart(false)
    }
  return (
    <Container>
      <Background>
        <Option
          active={value === 0 ? "true" : "false"}
          onClick={() => handlePosition(0)}
        >
          Pomodoro
        </Option>
        <Option
          active={value === 1 ? "true" : "false"}
          onClick={() => handlePosition(1)}
        >
          Descanso corto
        </Option>
        <Option
          active={value === 2 ? "true" : "false"}
          onClick={() => handlePosition(2)}
        >
          Descanso largo
        </Option>
      </Background>
    </Container>
  );
};
// ghiw7l => SCP cemilla
export default SelectTime;
