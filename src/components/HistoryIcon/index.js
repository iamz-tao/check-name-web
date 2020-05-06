import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'

const HistoryIcon = (props) => {
  const {
    size,
    onClick,
    title,
  } = props
  return (
    <Tooltip placement='top' title={title}>
    <CustomList
      name='history'
      size={size}
      onClick={onClick}
    />
  </Tooltip>
  )
}

HistoryIcon.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
}

HistoryIcon.defaultProps = {
  onClick: () => {
  },
  size: '',
}

export default HistoryIcon

const CustomList = styled(Icon)`
  color: #999696;
  margin: 0px !important;
  line-height: 24px !important;
  font-size: 1.7em !important;
  cursor: pointer;
`
