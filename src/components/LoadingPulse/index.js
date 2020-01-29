import React from 'react'
import styled, { keyframes } from 'styled-components'

const LoadingPulse = ({ isSmall }) => (
  <Wrapper isSmall={isSmall}>
    <Container>
      <Loading isSmall={isSmall} />
      <Loading isSmall={isSmall} />
      <Loading isSmall={isSmall} />
    </Container>
  </Wrapper>
)


export default LoadingPulse

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => (props.isSmall ? 'unset' : '25vh')} !important;
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

const Loading = styled.div`
  height: ${props => (props.isSmall ? '10px' : '30px')};
  width: ${props => (props.isSmall ? '10px' : '30px')};

  background-color: #F08282;
  border-radius: 50%;
  animation: 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) infinite normal both running ${spinner};
  
  &:nth-child(2) {
    margin: 0 10px;
    animation-delay: 0.12s;
    background-color: #D94646;
  }

  &:nth-child(3) {
    animation-delay: 0.24s;
    background-color: #DA0D0D;
  }
`
