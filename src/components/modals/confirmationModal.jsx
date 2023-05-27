/* eslint-disable react/prop-types */
import styled from "styled-components";

const Container = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ContainerText = styled.p`
  background-color: var(--fill-modal-1);
  padding: 20px;
  border-radius: 5px;
  box-shadow: var(--box-shadow-1);
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-color-2);
`;

//
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
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default function ConfirmationModal({ closeModal,anyFunction,text,confirmbuttonText }) {
  return (
    <Container>
      <ContainerText>{text}</ContainerText>
      <Buttons>
        <ButtonDelete onClick={closeModal}>
          <h3>Cancelar</h3>
        </ButtonDelete>
        <Button onClick={anyFunction}>
          <h3>{confirmbuttonText}</h3>
        </Button>
      </Buttons>
    </Container>
  );
}
