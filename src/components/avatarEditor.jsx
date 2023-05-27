/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 10px;
  /* background-color: red; */
  height: fit-content;
  /* padding-top: 30px; */
  input {
    width: 50%;
    width: 250px;
  }
`;
const ImageLink = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;
export default function AvatarEditorComponent({
  img = "https://i.pinimg.com/236x/d4/cf/b8/d4cfb8f697bdd5a7247d7c2aebfa4340.jpg",
  setUrlCanvas,
  size,
  disabled,
}) {
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);
  // const [multiples, setMultiple] = useState(true);

  const handleScale = (e) => {
    setScale(Number(e.target.value));
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage().toDataURL();
      setUrlCanvas(canvas);
    }
  };
  return !disabled ? (
    <Container
      // style={{paddingTop:size ? "10px" : "30px"}}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <AvatarEditor
        width={size ? size : 250}
        height={size ? size : 250}
        image={img}
        border={0}
        scale={scale}
        borderRadius={250}
        ref={editorRef}
        style={{ borderRadius: "10px" }}
        onMouseUp={() => {
          const canvas = editorRef.current.getImage().toDataURL();
          setUrlCanvas(canvas);
          // if (multiples) {
          //   setMultiple(false);
          //   setTimeout(() => {
          //     const canvas = editorRef.current.getImage().toDataURL();
          //     setUrlCanvas(canvas);
          //     setMultiple(true);
          //   }, 100);
          // }
        }}
      ></AvatarEditor>
      <input
        style={{ width: size && size + "px" }}
        // size={size}
        onMouseUp={handleSave}
        type="range"
        max={3}
        min={1}
        step={0.01}
        onChange={handleScale}
        defaultValue={scale}
      />
    </Container>
  ) : (
    <ImageLink src={img} />
  );
}
