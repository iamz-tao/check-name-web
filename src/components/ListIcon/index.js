import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const ListIcon = (props) => {
  const {
    size,
    onClick,
  } = props
  return (
    <CustomList
      name='unordered list'
      size={size}
      onClick={onClick}
    />
  )
}

ListIcon.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
}

ListIcon.defaultProps = {
  onClick: () => {
  },
  size: '',
}

export default ListIcon

const CustomList = styled(Icon)`
  color: #999696;
  margin: 0px !important;
  line-height: 24px !important;
  font-size: 1.7em !important;
  cursor: pointer;
`
