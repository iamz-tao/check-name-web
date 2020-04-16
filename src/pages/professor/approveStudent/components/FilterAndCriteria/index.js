import React from 'react'
import PropTypes from 'prop-types'
import {
  Segment,
  Dropdown,
} from 'semantic-ui-react'
import styled from 'styled-components'
import FormButton from '~/components/Form/Button'

const FilterAndCriteria = (props) => {
  const {
    handleInputChange,
    handleInputChangeSection,
    handleFilter,
    handleResetFilter,
    currentYear,
    //  filter, handleResetFilter, reset,
    allSection,
    filter,
  } = props

  const subjects = []
  const sections = []
  let year = ''
  let semester = ''

  if (currentYear) {
    year = currentYear.get('year'),
    semester = currentYear.get('semester') === 'SECOND' ? 2 : currentYear.get('semester') === 'FIRST' ? 1 : 'SUMMER'
  }

  if (allSection) {
    allSection.map((s, index) => {
      subjects.push(
        {
          key: index,
          text: `${s.getIn(['Subject', 'subject_code'])} ${s.getIn(['Subject', 'subject_name'])}`,
          value: s.getIn(['Subject', 'subject_name']),
        },
      )
    })
  }

  if (filter.subject !== '') {
    allSection.filter(s => s.getIn(['Subject', 'subject_name']) === filter.subject).getIn([0, 'sections']).map((sec, index) => {
      sections.push(
        {
          key: index,
          text: sec.getIn(['section_number']),
          value: sec.getIn(['section_number']),
        },
      )
    })
  }


  return (
    <Wrapper>
      <HeaderSection>
        <HeaderText>
          SEARCH SUBJECT
        </HeaderText>

      </HeaderSection>
      <SectionWrapper>
        <SearchText>
          YEAR/ SEMESTER:
          {' '}
          {year}
          /
          {semester}
        </SearchText>
        <SearchText>
          SUBJECT:
        </SearchText>
        <Dropdown placeholder='Subject' value={filter.subject} search selection options={subjects} onChange={handleInputChange} />
      </SectionWrapper>
      <SectionWrapper>
        <SearchText>
          SECTION NUMBER :
        </SearchText>
        <Dropdown placeholder='Section Number' value={filter.section} search selection options={sections} onChange={handleInputChangeSection} />
      </SectionWrapper>
      <CustomButton>
        <FormButton
          isFilter
          type='cancel'
          txtButton='RESET'
          width='50%'
          margin='0px 0px 12px 0px'
          onClick={() => {
            handleResetFilter()
          }}
        />
          &nbsp; &nbsp;
        <FormButton
          isFilter
          colorButton='#CA5353'
          type='submit'
          txtButton='SEARCH'
          width='50%'
          margin='0px 0px 12px 0px'
          onClick={() => {
            handleFilter()
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
    padding: 1em 2em;
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

  .ui.selection.active.dropdown .menu {
    border-radius: 0px 0px 18px 18px;
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
