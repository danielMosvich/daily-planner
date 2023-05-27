import styled from "styled-components";
import IconContainer from "./miniComponents/iconContainer";
const Container = styled.div`
  /* position: fixed; */
  /* top: 10px;
  right: 50px; */
  background-color: var(--fill-1);
  /* width: 150px;
  height: 150px; */
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  stroke: var(--fill-5);
  box-shadow: var(--box-shadow-1);
  cursor: pointer;
  transition: background var(--transition-1), color var(--transition-1),
    box-shadow var(--transition-1);
  &:hover {
    background-color: var(--fill-modal-1);
    box-shadow: var(--box-shadow-3);
  }
`;
// eslint-disable-next-line react/prop-types
export default function AddComponent({ anyFunction }) {
  function handleAnyFunction() {
    anyFunction(true);
  }
  return (
    <Container onClick={handleAnyFunction}>
      <IconContainer size={80}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </IconContainer>
    </Container>
  );
}
