import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { userAction } from '~/modules/admin/actions'

const Wrapper = styled.div`
  padding: 0 20px;
  flex: 1;
  display: flex;
  height: 50px;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.adminNavbar};
  justify-content: space-between;
  align-items: center;
`

const State = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
`

const StandIn = styled.span`
  line-height: 50px;
  display: inline;
`

const LogoutStandIn = styled.button`
  z-index: 111;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.white};
  height: fit-content;
  width: auto;
  min-width: 100px;
  text-transform: uppercase;
  &:hover {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.default};
    border: 1px solid transparent;
  }
  
`

const StandInMode = (props) => {
  const dispatch = useDispatch()
  const { email } = props
  const exitStandInMode = () => dispatch(userAction.exitStandIn())

  return (
    <Wrapper>
      <State>
        <StandIn>
          <FormattedMessage
            id='stand-in-by'
            defaultMessage='Stand In By'
            values={{
              email,
            }}
          />
        </StandIn>
      </State>
      <LogoutStandIn
        onClick={exitStandInMode}
      >
        <FormattedMessage
          id='exit-stand-in'
          defaultMessage='Exit Stand In'
        />
      </LogoutStandIn>
    </Wrapper>
  )
}
export default memo(StandInMode)
