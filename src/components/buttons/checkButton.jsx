import styled from "styled-components";
import { motion } from "framer-motion";
const Container = styled(motion.div)`
  background-color: ${(props) =>
    props.status === "checked" ? "var(--user-color-1)" : "transparent"};
  border: 1px solid
    ${(props) =>
      props.status === "checked" ? "transparent" : "var(--text-color-5)"};
  min-width: 22px;
  min-height: 22px;
  width: 22px;
  height: 22px;
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.status === "checked" ? "white" : "transparent")};
  border-radius: 50%;
  user-select: none;
  transition: background var(--transition-1), border var(--transition-1),
    color var(--transition-1);
  cursor: pointer;
`;
export default function CheckButton({ status, functionChange, todo }) {
  const changeStatus = () => {
    functionChange(todo);
  };
  return (
    <Container
      status={status}
      onClick={todo && changeStatus}
      whileTap={{
        y: 2,
        scale: 1.05,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // fill="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={4}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    </Container>
  );
}
