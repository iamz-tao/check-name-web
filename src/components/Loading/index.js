import React from 'react'
import styled, { keyframes } from 'styled-components'

const Loading = ({ isSmall }) => (
  <Wrapper isSmall={isSmall}>
    <Container>
      <LoadingCustom isSmall={isSmall} />
      <LoadingCustom isSmall={isSmall} />
      <LoadingCustom isSmall={isSmall} />
    </Container>
  </Wrapper>
)


export default Loading

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Container = styled.div`
  display: flex;
`

const spinner = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  45% {
    transform: scale(.1);
    opacity: .7;
  }
  80% {
    transform: scale(1);
    opacity: 1;
  }
`

const LoadingCustom = styled.div`
  height: ${props => (props.isSmall ? '10px' : '30px')};
  width: ${props => (props.isSmall ? '10px' : '30px')};

  margin-bottom: 1vh;
  margin-top: 1vh;
  background-color: #F08282;
  border-radius: 50%;
  animation: 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) infinite normal both running ${spinner};
  
  &:nth-child(2) {
    margin: 0 10px;
    animation-delay: 0.12s;
    background-color: #D94646;
    margin-top: 8px;

  }
  
  &:nth-child(3) {
    animation-delay: 0.24s;
    background-color: #DA0D0D;
  }
`
