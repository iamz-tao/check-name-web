import React from 'react'
import styled from 'styled-components'
import {
  Icon,
} from 'semantic-ui-react'

const StickyBlock = ({
  id,
  handleDelete,
  handleSave,
  handleSaveBack,
  handleDisable,
}) => (
  <StyleStickyBlock>
    {
      id !== undefined && (
        <Back>
          <GhostButton
            onClick={handleDelete}
          >
            <Icon size='large' color='grey' name='trash alternate' />
          </GhostButton>
        </Back>
      )
      }
    <Confirm>
      <StyleSolidButton onClick={handleSave} disabled={handleDisable}>
            SAVE
      </StyleSolidButton>
    </Confirm>
    <Confirm style={{ marginRight: '0px' }}>
      <SolidButton onClick={handleSaveBack} disabled={handleDisable}>
            SAVE & BACK
      </SolidButton>
    </Confirm>
  </StyleStickyBlock>
)

export default StickyBlock

const StyleStickyBlock = styled.div`
    padding: 10px;
    bottom: 0;
    background-color: #fefefe;
    position: fixed;
    display: flex;
    min-width: 320px;
    width: 100%;
`

const Back = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  width: 48px;
`

const Confirm = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`

const Button = styled.button`
  text-transform: uppercase;
  outline: none;
  width: 100%;
  height: 40px;
  border: none;
  background-color: ${props => props.theme.colors.white};
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
`

const GhostButton = styled(Button)`
  /* border: 2px solid ${props => props.theme.colors.red}; */
  color: ${props => props.theme.colors[props.color || 'primary']};
`

const SolidButton = styled(Button)`
  background-color: ${props => props.theme.colors[props.color || 'primary']};
  color: ${props => props.theme.colors.white};
  :disabled {
    opacity: 0.5;
  }
`
const StyleSolidButton = styled(Button)`
  background-color: #fff;
  color: rgba(0,0,0,0.6);
  border: 1px solid rgba(0,0,0,0.15);
  font-family: kanit;
  font-weight: 600;
:disabled {
  opacity: 0.5;
}
`
