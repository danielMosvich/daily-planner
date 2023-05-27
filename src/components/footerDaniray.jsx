/* eslint-disable react/prop-types */
import styled from "styled-components";
import IconContainer from "./miniComponents/iconContainer";

const Container = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(fill-1);
`;
const ContainerUser = styled.div`
  display: flex;
  gap: 20px;
  div {
    display: flex;
    gap: 5px;
    width: 100%;
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--text-color-3);
    cursor: default;
    a {
      display: inline-block;
      text-decoration: none;
      display: flex;
      font-weight: 600;
      color: var(--user-color-1);
    }
  }
`;
const ContainerTwitter = styled.a`
  display: flex;
  gap: 10px;
  cursor: pointer;
  display: flex;
  text-decoration: none;
  h2 {
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--text-color-3);
    transition: color var(--transition-1);
  }
  svg {
    stroke: var(--text-color-3);
    transition: stroke var(--transition-1);
  }
  &:hover {
    h2 {
      color: #1da1f2;
    }
    svg {
      stroke: #1da1f2;
    }
  }
`;
const ContainerGithub = styled.a`
  display: flex;
  gap: 10px;
  cursor: pointer;
  display: flex;
  text-decoration: none;
  h2 {
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--text-color-3);
    transition: color var(--transition-1);
  }
  svg {
    stroke: var(--text-color-3);
    transition: stroke var(--transition-1);
  }
  &:hover {
    h2 {
      color: var(--text-color-1);
    }
    svg {
      stroke: var(--text-color-1);
    }
  }
`;
// eslint-disable-next-line no-unused-vars
export default function FooterDaniray({ bg }) {
  return (
    <Container>
      <ContainerUser>
        <div>
          Build by{" "}
          <a
            href="https://danielmosvich.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Daniray
            <IconContainer size={20}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="var(--user-color-1)"
                className="w-6 h-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
              </svg>
            </IconContainer>
          </a>
        </div>
        {/* - 2023 © */}
      </ContainerUser>
      <ContainerUser>
        <div>
          Logo by{" "}
          <a href="mailto:micaelsimeonrimac@gmail.com" target="_blank" rel="noreferrer">
            Efrain
          </a>
        </div>
      </ContainerUser>
      <ContainerTwitter
        href="https://twitter.com/danielmosvich"
        target="_blank"
      >
        <IconContainer size={20}>
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            // color="#1DA1F2"
          >
            <path
              d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z"
              //   stroke="#1DA1F2"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </IconContainer>
        <h2>Twitter</h2>
      </ContainerTwitter>
      <ContainerGithub href="https://github.com/danielMosvich" target="_blank">
        <IconContainer size={20}>
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            // color="var(--text-color-2)"
          >
            <path
              d="M16 22.027v-2.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 00-1.5-3.75 5.07 5.07 0 00-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 00-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 005 5.797a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 00-.94 2.58v2.87M9 20.027c-3 .973-5.5 0-7-3"
              //   stroke="var(--text-color-2)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </IconContainer>
        <h2>GitHub</h2>
      </ContainerGithub>
    </Container>
  );
}
