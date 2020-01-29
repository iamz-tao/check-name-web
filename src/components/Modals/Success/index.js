import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// language=SCSS prefix=&{ suffix=}
const Wrapper = styled(Modal)`
    text-align: center !important;

    .header,
    .actions {
      text-align: center !important;
      color: #F37021 !important;
    }

    span {
      color: #F37021 !important;
    }
`

const ErrorModal = (props) => {
  const {
    content,
    open,
    message,
    onClick,
    txtButton,
  } = props

  return (
    <Wrapper open={open}>
      <Header
        icon='browser'
        content={content}
        textAlign='center'
      />
      <Modal.Content>
        {message}
      </Modal.Content>
      <Modal.Actions>
        <Button
          basic
          color='orange'
          onClick={onClick}
        >
          {txtButton}
        </Button>
      </Modal.Actions>
    </Wrapper>
  )
}

ErrorModal.propTypes = {
  content: PropTypes.string,
  txtButton: PropTypes.string,
  open: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

ErrorModal.defaultProps = {
  content: '',
  txtButton: 'Close',
  open: false,
}

export default ErrorModal
