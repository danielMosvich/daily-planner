import styled from "styled-components";
const Container = styled.p`
    /* font-size: 1rem; */
    font-size: var(--font-size-base);
    text-transform: capitalize;
    color:var(--text-color-3);
    font-weight: 500;
    border-bottom: 2px solid var(--text-color-5);
    /* background-color: red; */
    /* margin-top: 5px; */
    padding-bottom: 8px;
    margin: 5px 0 8px;
    transition: color var(--transition-1), border var(--transition-1);
    @media (max-width:450px) {
        font-size: var(--font-size-sm);
    }
`
export default function CardSubtitle({children}){
    return(
        <Container>
            {children}
        </Container>
    )
}