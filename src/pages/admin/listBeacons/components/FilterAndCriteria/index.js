import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  Segment,
  Dropdown,
} from 'semantic-ui-react'
import { Button } from 'antd'
import styled from 'styled-components'

import FormButton from '~/components/Form/Button'


const FilterAndCriteria = (props) => {
  const {
    handleInputChange,
    handleResetFilter,
    filter,
  } = props

  return (
    <Wrapper>
      <HeaderSection>
        <HeaderText>
          SEARCH BEACON
        </HeaderText>
        <Button type='dashed' onClick={handleResetFilter}>Reset Filter</Button>
      </HeaderSection>
      <SectionWrapper>
        <SearchText>
          Keyword:
        </SearchText>
        <Input
          name='keyword'
          placeholder='UUID, Name'
          onChange={handleInputChange}
          value={filter.keyword}
        />
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

  .ant-btn-dashed {
    border-radius: 18px;
  }

  .ant-btn-dashed:focus, .ant-btn-dashed:hover {
    color: #767676;
    background-color: #fff;
    border-color: #767676;
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

const CustomButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
