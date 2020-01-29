import React from 'react'
import styled from 'styled-components'
import { Input } from 'semantic-ui-react'

const TypeableRange = (props) => {
  const {
    minAge,
    maxAge,
    handleChange,
    handleOnBlur,
  } = props

  return (
    <PageWrapper>
      <RowWrapper>
        <BoxWrapper>
          <CustomInput
            value={minAge}
            name='minAge'
            onChange={handleChange}
            type='tel'
            onBlur={handleOnBlur}
          />
        </BoxWrapper>
        <TextWrapper>
          &nbsp;-&nbsp;
        </TextWrapper>
        <BoxWrapper>
          <CustomInput
            // placeholder='hello...'
            value={maxAge}
            name='maxAge'
            onChange={handleChange}
            type='tel'
            onBlur={handleOnBlur}
          />
        </BoxWrapper>
      </RowWrapper>
    </PageWrapper>
  )
}

TypeableRange.propTypes = {}

TypeableRange.defaultProps = {}

export default TypeableRange

const PageWrapper = styled.div`

`
const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`
const BoxWrapper = styled.div`
`
const CustomInput = styled(Input)`
  width: 123px;
  //text-align: center !important;  
  
  input {
    text-align: center !important;
  }
`
const TextWrapper = styled.div`
  line-height: 38px;
  font-weight: 600;
`
