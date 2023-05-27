/* eslint-disable react/prop-types */
import styled from "styled-components"

const Container = styled.h2`
    /* font-size: 1.4rem; */
    font-size: var(--font-size-md);
    color: var(--text-color-1);
    font-weight:600;
    text-transform: capitalize;
    transition: color var(--transition-1);
`
export default function CardTitle({children}){
    return(
        <Container>
            {children}
        </Container>
    )
}