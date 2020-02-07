import React from 'react'
import styled from 'styled-components'
import {
  Dropdown as SemanticDropdown,
} from 'semantic-ui-react'

const Dropdown = (field) => {
  const {
    options,
    width,
    placeholder,
    handleInput,
    meta: { error, touched },
  } = field
  return (
    <Wrapper>
      <CustomDropdown
        {...field.input}
        value={field.input.value}
        placeholder={placeholder}
        selection
        width={width}
        options={options}
        error={touched && error}
        onChange={(e, { name, value }) => handleInput(name, value)}
      />
    </Wrapper>
  )
}

export default Dropdown

const Wrapper = styled.div`
  .ui.disabled.dropdown,
  .ui.dropdown .menu>.disabled.item {
    background: #f5f6f7 !important;
    color: #929598 !important;
  }
`
const CustomDropdown = styled(SemanticDropdown)`
  display: flex;
  justify-content: center;
  min-width: ${props => props.width} !important;
  min-height: 32px !important;
  max-height: 32px !important;
  padding: 6px 10px 6px 10px !important;

  .dropdown.icon {
    padding: 6px 10px 6px 10px !important;
  }
  
  //@media (max-width: 700px) {
  //  width: 80% !important;
  //  margin: 5px 0px 15px 0px !important;
  //}
  //
  //@media (max-width: 500px) {
  //  width: 90% !important;
  //  margin: 5px 0px 15px 0px !important;
  //}
`
