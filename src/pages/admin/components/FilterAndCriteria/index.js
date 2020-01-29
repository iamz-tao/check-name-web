import React from 'react'
import PropTypes from 'prop-types'
import {
  Checkbox as SemanticCheckbox,
  Input,
  Segment,
} from 'semantic-ui-react'
import { Button } from 'antd'
import styled from 'styled-components'

import { user_types } from '~/config/constants'

const FilterAndCriteria = (props) => {
  const {
    handleCheckboxUserType,
    handleInputChange,
    handleResetFilter,
    filter,
  } = props

  return (
    <Wrapper>
      <HeaderSection>
        <HeaderText>
          FIND USER
        </HeaderText>
        {/* <ResetFilter onClick={handleResetFilter}>
          Reset Filter
        </ResetFilter> */}
        <Button type='dashed' onClick={handleResetFilter}>Reset Filter</Button>
      </HeaderSection>
      <SectionWrapper>
        <SearchText>
          KEYWORD :
        </SearchText>
        <Input
          name='keyword'
          placeholder='ID, Name...'
          onChange={handleInputChange}
          value={filter.keyword}
        />
      </SectionWrapper>

      <SectionWrapper>
        <SearchText>
          USER TYPE :
        </SearchText>
        {
          user_types.map(({ label, value }, i) => (
            <Checkbox
              radio
              checked={filter.user_role.indexOf(value) > -1}
              label={label}
              value={value}
              onChange={handleCheckboxUserType}
            />
          ))
        }
      </SectionWrapper>
    </Wrapper>
  )
}

FilterAndCriteria.propsTypes = {
  filter: PropTypes.instanceOf(Object),
  handleResetFilter: PropTypes.func,
}

export default FilterAndCriteria

const Wrapper = styled(Segment)`
  background: white;
  border-radius: 4px;
  border: none;
  width: 300px;

  && {
    margin: 0;
    border: 1px solid #E8E8E8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 28px;
    padding: 1em 2em;
  }

  .ui.input.segment {
    border: 1em 1.5em;
  }

  .ui.input>input {
    background: #FFFFFF;
    border: 1px solid #243445;
    box-sizing: border-box;
    border-radius: 18px;
  }

  .ui.search.dropdown {
    background: #FFFFFF;
    border: 1px solid #243445;
    box-sizing: border-box;
    border-radius: 18px;
  }

  .ui.radio.checkbox .box:before, .ui.radio.checkbox label:before {
    background: #FFFFFF;
    border: 1px solid #C4C4C4;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    height: 18px;
    width: 18px;
    top: 2px;
  }

  .ui.radio.checkbox .box, .ui.radio.checkbox label {
    font-family: Kanit;
    font-size: 14px;
    line-height: 24px;
    text-transform: capitalize;
    color: #575757;
  }

  .ui.radio.checkbox input:checked~.box:after, .ui.radio.checkbox input:checked~label:after {
    top: 3px;
    left: 1px;
  }

  .ant-btn-dashed {
    border-radius: 18px;
  }

  .ant-btn-dashed:focus, .ant-btn-dashed:hover {
    color: #767676;
    background-color: #fff;
    border-color: #767676;
}
`

const Checkbox = styled(SemanticCheckbox)`
  margin: 8px 0;

  .input:checked ~ .box:after {
    background: #f37021;
    color: white;
  }
`
const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
`

const HeaderText = styled.h1`
    font-size: 16px;
`

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 20px 0px;
`

const SearchText = styled.span`
  font-size: 14px;
  font-family: kanit;
  text-transform: capitalize;
  color: #575757;
  margin: 10px 0px 10px 0px;
`