import React from 'react'
import PropTypes from 'prop-types'
import {
  Checkbox as SemanticCheckbox,
  Input,
  Segment,
  Divider,
} from 'semantic-ui-react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'


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
          <FormattedMessage id='filter' defaultMessage='Filter' />
        </HeaderText>
        <ResetFilter onClick={handleResetFilter}>
          <FormattedMessage id='reset-filter' defaultMessage='Reset Filter' />
        </ResetFilter>
      </HeaderSection>
      <Divider />
      <SectionWrapper>
        <SearchText>
          <FormattedMessage id='search' defaultMessage='Search' />
        </SearchText>
        <FormattedMessage
          id='search-user'
          defaultMessage='ID, Name, Email, ...'
        >
          {
            msg => (
              <Input
                name='keyword'
                placeholder={msg}
                onChange={handleInputChange}
                value={filter.keyword}
              />
            )
          }
        </FormattedMessage>
      </SectionWrapper>

      <SectionWrapper>
        <SearchText>
          <FormattedMessage id='User-Type' defaultMessage='User Type' />
        </SearchText>
        {
          user_types.map(({ label, value }, i) => (
            <Checkbox
              radio
              checked={filter.user_types.indexOf(value) > -1}
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
  padding: 24px !important;

  && {
    margin: 0;
  }
`

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
`

// language=SCSS prefix=&{ suffix=}
const HeaderText = styled.h1`
  font-size: 18px;
`

const ResetFilter = styled.span`
  font-size: 14px;
  color: #f37021;
  cursor: pointer;
`

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 20px 0px;
`

const SearchText = styled.span`
  font-size: 16px;
  color: ${props => (props.color ? props.color : 'black')};
  margin: 10px 0px 10px 0px;
`

const Checkbox = styled(SemanticCheckbox)`
  margin: 8px 0;

  .input:checked ~ .box:after {
    background: #f37021;
    color: white;
  }
`
