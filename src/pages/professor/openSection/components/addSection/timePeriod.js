import React from 'react'
import { TimePicker } from 'antd'
import styled from 'styled-components'
import { Form } from 'semantic-ui-react'
import { fromJS } from 'immutable'
import moment from 'moment'

import DefaultForm from '~/components/DefaultForm'

const format = 'HH:mm'

const TimePeriod = (props) => {
//   const {
//     feat,
//     from,
//     to,
//     feats,
//     onChangeTimeFrom,
//     onChangeTimeTo,
//     all,
//   } = props

  //   const differences = calculateShowTime(all.get(feat.get('_id')))

  //   const hourDifference = differences ? differences[0] : 0
  //   const minuteDifference = differences ? differences[1] : 0

  const onChangeTimeFrom = (from) => {
console.log('xxxx')
    // const { change, all } = this.props
    // const toRange = all.getIn([id, 1])
    // if (!toRange) {
    //   change(`features.${id}`, [from, ''])
    // } else {
    //   change(`features.${id}`, [from, toRange])
    // }
    // await this.setState({ from })
    // this.handleTimeFrom()
  }

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
            onChange={() => onChangeTimeFrom()}
            // defaultValue={moment(all.getIn([feat.get('_id'), 0], moment('00:00', 'HH:mm')))}
            placeholder='Start Time'
          />

            &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
            End Time
          <TimePicker
            format={format}
            // onChange={time => onChangeTimeTo(time)}
            // defaultValue={moment(all.getIn([feat.get('_id'), 1], moment('00:00', 'HH:mm')))}
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
