import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'

const DeleteIcon = (props) => {
  const {
    size,
    onClick,
    title,
  } = props
  return (
    <Tooltip placement='top' title={title}>
      <Trash
        name='trash alternate outline'
        size={size}
        onClick={onClick}
      />
    </Tooltip>
  )
}

DeleteIcon.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
}

DeleteIcon.defaultProps = {
  onClick: () => {
  },
  size: '',
}

export default DeleteIcon

const Trash = styled(Icon)`
  color: #999696;
  margin: 0px !important;
  line-height: 24px !important;
  font-size: 1.7em !important;
  cursor: pointer;
`
