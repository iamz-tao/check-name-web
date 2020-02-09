import React from 'react'
import { TimePicker } from 'antd'
import styled from 'styled-components'
import { Form } from 'semantic-ui-react'
import { fromJS } from 'immutable'
import moment from 'moment'

import DefaultForm from '~/components/DefaultForm'

const format = 'HH:mm'

const TimePeriod = (props) => {
  const {
    from,
    to,
    // onChangeTimeFrom,
    // onChangeTimeTo,
  } = props

  return (
    <BlankWrapper>

      <DefaultForm
        isFeature
        label='SELECT TIME'
      >
        <ShowTimeWrapper>
          Start Time
          <TimePicker
            format={format}
            onChange={time => from(time)}
            defaultValue={moment('00:00', 'HH:mm')}
            placeholder='Start Time'
          />

          &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
          End Time
          <TimePicker
            format={format}
            onChange={time => to(time)}
            defaultValue={moment('00:00', 'HH:mm')}
            placeholder='End Time'
          />
        </ShowTimeWrapper>
      </DefaultForm>
    </BlankWrapper>
  )
}

export default TimePeriod

const BlankWrapper = styled.div`

`
const Length = styled.span`
  font-family: Sarabun !important;
  font-size: 14px !important;
  line-height: 32px;
`
const ShowTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

`
const Wrapper = styled.div`
  display: flex;
`
