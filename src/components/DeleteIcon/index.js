import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const DeleteIcon = (props) => {
  const {
    size,
    onClick,
  } = props
  return (
    <Trash
      name='trash alternate outline'
      size={size}
      onClick={onClick}
    />
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
  color: #E1E1E1;
  margin: 0px !important;
  line-height: 24px !important;
  font-size: 1.7em !important;
`
