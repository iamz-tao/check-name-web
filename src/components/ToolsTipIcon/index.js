import React from 'react'
import {
  Tooltip,
} from 'antd'
import InformationIcon from '~/static/images/information-icon.svg'

const ToolsTipIcon = ({ content }) => (
  <Tooltip title={content}>
    <InformationIcon style={{ width: '14px', height: '14px' }} />
  </Tooltip>
)

export default ToolsTipIcon
