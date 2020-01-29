import React from 'react'
import { Range } from 'rc-slider'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const RangeSelector = (props) => {
  const {
    min,
    max,
    handleChange,
    rangeValue,
  } = props
  return (
    <BudgetWrapper>
      <ElementWrapper>
        <PeriodWrapper>
          <BudgetBoxWrapper>
            {rangeValue[0]}
          </BudgetBoxWrapper>
          <FilterTitleText>&nbsp;-&nbsp;</FilterTitleText>
          <BudgetBoxWrapper>
            {rangeValue[1]}
          </BudgetBoxWrapper>
        </PeriodWrapper>
      </ElementWrapper>
      <Range
        min={min}
        max={max}
        trackStyle={[{
          backgroundColor: '#FF9D63',
          height: '6px',
        }, { backgroundColor: '#FF9D63' }]}
        handleStyle={
          [{
            backgroundColor: '#F37021',
            borderColor: '#F37021',
            height: '14px',
            width: '14px',
          }, {
            backgroundColor: '#F37021',
            borderColor: '#F37021',
            height: '14px',
            width: '14px',
          }]
        }
        railStyle={{
          backgroundColor: '#E1E1E1',
          height: '6px',
        }}
        onAfterChange={handleChange}
        defaultValue={rangeValue}
      />
    </BudgetWrapper>
  )
}

RangeSelector.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  handleChange: PropTypes.func,
  rangeValue: PropTypes.arrayOf(Object),
}

RangeSelector.defaultProps = {
  min: 0,
  max: 0,
  handleChange: () => {
  },
  rangeValue: [],
}

export default RangeSelector

const BudgetWrapper = styled.div`
`

const ElementWrapper = styled.div`
  padding-bottom: 8px;
`

const PeriodWrapper = styled.div`
    display: flex;
    //justify-content: space-between;
    flex-wrap: wrap;
    justify-content: center;
`
const BudgetBoxWrapper = styled.div`
  border-radius: 4px;
  font-size: 14px;
  height: 38px;
  width: 123px;
  border: 1px solid #DADDE1;
  padding: 8px;
  text-align: center;
`
const FilterTitleText = styled.span`
  font-size: 16px;
  color: ${props => (props.color ? props.color : 'black')};
  margin: 10px 0;
`
