/* eslint-disable react/prop-types */
import styled from "styled-components"


const Container = styled.div`
    width:${props => props.size ? `${props.size}px` : "30px"};
    height:${props => props.size ? `${props.size}px`: "30px"};
    color:${props => props.color ? props.color : "black"};
    /* background-color:red; */
    /* display:flex; */
    /* justify-content:center; */
    /* align-items:center; */
    /* background-color:blue; */
    /* background-color:blue; */
`
export default function IconContainer({size,children,color}){
    return(
        <Container size={size} color={color}>
            {children}
        </Container>
    )
}