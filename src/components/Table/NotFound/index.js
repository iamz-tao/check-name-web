import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

const NotFoundWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;

    > h1 {
      font-size: 2em;
      color: #929598;
    }
`

const RowContainer = styled.div`
  display: flex;
  padding: 20px;
  flex: 1;
`

const NotFound = ({ message }) => (
  <RowContainer>
    <NotFoundWrapper>
      <h1>
        {message}
      </h1>
    </NotFoundWrapper>
  </RowContainer>
)

NotFound.propTypes = {
  message: PropTypes.string,
}

NotFound.defaultProps = {
  message: 'There\'s no item in this list',
}

export default NotFound
