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
    handleInputChangeSection,
    handleFilterHistory,
    filter,
    handleResetFilter,
    subjects,
    id,
    sectionID,
  } = props

  const subject = []
  const sections = []
  subjects && subjects.map((sub) => {
    subject.push({
      value: sub.getIn(['Subject', 'subject_code']),
      text: `${sub.getIn(['Subject', 'subject_code'])} ${sub.getIn(['Subject', 'subject_name'])}`,
    })
  })

  if (id !== '') {
    subjects.filter(s => s.getIn(['Subject', 'subject_code']) === id).getIn([0, 'sections']).map((sec) => {
      sections.push({
        value: sec.getIn(['id']),
        text: sec.getIn(['section_number']),
      })
    })
  }
// console.log(sectionID)
  return (
    <Wrapper>
      <HeaderSection>
        <HeaderText>
          PLEASE SELECT SUBJECT
        </HeaderText>
        <Button type='dashed' onClick={handleResetFilter}>Reset</Button>
      </HeaderSection>
      <SectionWrapper>
      <SearchText>
          SUBJECT:
        </SearchText>
        <Dropdown placeholder='Subject' value={filter.subjectsData} search selection options={subject} onChange={handleInputChange} />
      </SectionWrapper>
      <SectionWrapper>
        <SearchText>
          SECTION NUMBER :
        </SearchText>
        <Dropdown placeholder='Section Number' value={filter.sections} search selection options={sections} onChange={handleInputChangeSection} />
      </SectionWrapper>
      <CustomButton>
        {/* <FormButton
          isFilter
          type='cancel'
          txtButton='RESET'
          width='50%'
          margin='0px 0px 12px 0px'
          onClick={() => {
            handleResetFilter()
          }}
        />
          &nbsp; &nbsp; */}
        <FormButton
          disabled={sectionID === ''}
          isFilter
          colorButton='#CA5353'
          type='submit'
          txtButton='SUBMIT'
          width='50%'
          margin='0px 0px 12px 0px'
          onClick={() => {
            handleFilterHistory(sectionID)
          }}
        />
      </CustomButton>
    </Wrapper>
  )
}

FilterAndCriteria.propsTypes = {
  filter: PropTypes.instanceOf(Object),
  handleResetFilter: PropTypes.func,
}

FilterAndCriteria.defaultProps = {
  filter: {
    areas: [],
  },
  maxGrossPrice: 0,
  handleResetFilter: () => {
  },
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
