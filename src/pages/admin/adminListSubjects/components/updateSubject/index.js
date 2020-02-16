import React from 'react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Modal,
  Form as SemanticForm,
} from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form/immutable'
import { fromJS } from 'immutable'

import {
  SemanticInput,
} from '~/components/ReduxForm'
import DefaultForm from '~/components/DefaultForm'
import FormButton from '~/components/Form/Button'
import { subjectsSelector } from '~/modules/subject/selectors'

const UpdateSubject = (props) => {
  const {
    handleModal,
    open,
    handleSubmit,
    handleUpdate,
  } = props
  return (
    <StyledWrapper
      closeOnDimmerClick={false}
      closeIcon
      open={open}
      onClose={() => handleModal()}
    >
      <Modal.Content>
        <Header>
          UPDATE SUBJECT
        </Header>
        <Wrapper>
          <Form onSubmit={handleSubmit(handleUpdate)}>

            <DefaultForm
              label='SUBJECT CODE :'
              width='176px'
              marginBottom='6px'
            >
              <Field
                required
                name='subject_code'
                placeholder='Subject Code'
                component={SemanticInput}
              />
            </DefaultForm>
            <DefaultForm
              label='SUBJECT NAME :'
              width='176px'
              marginBottom='6px'
            >
              <Field
                name='subject_name'
                placeholder='Subject Name'
                component={SemanticInput}
              />
            </DefaultForm>
            <CustomButton>
              <FormButton
                isFilter
                type='reset'
                txtButton='CANCEL'
                width='50%'
                onClick={() => {
                  handleModal()
                }}
              />
                  &nbsp; &nbsp;
              <FormButton
                isFilter
                colorButton='#CA5353'
                type='submit'
                txtButton='UPDATE'
                width='50%'
                onClick={() => {
                }}
              />
            </CustomButton>
          </Form>

        </Wrapper>
      </Modal.Content>
    </StyledWrapper>
  )
}

UpdateSubject.propTypes = {
  subject: PropTypes.instanceOf(Map),
  handleSubmit: PropTypes.func,
}

UpdateSubject.defaultProps = {
  subject: fromJS({}),
  handleSubmit: () => {
  },
}

const FORM_NAME = 'UPDATE_SUBJECT'

const withForm = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})

const mapStateToProps = (state, props) => createStructuredSelector({
  initialValues: subjectsSelector.getSubject,
  subject: subjectsSelector.getSubject,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  // updateSubject: subjectAction.updateSubject,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withForm,
)(UpdateSubject)

// export default UpdateSubject

const Header = styled.span`
  font-size: 18px;
  font-family: Kanit;
  font-weight: bold;
  color: black;
  display: flex;
  padding-left: 18px;
`
const CustomButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const StyledWrapper = styled(Modal)`
  max-width: 600px !important;
  min-width: 300px;
  text-align: center !important;
  padding-right: 18px;
  height: fit-content;
  background: #FFFFFF;
  border: 1px solid #C4C4C4 !important;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  font-family: kanit;
  font-size: 14px !important;
  .ant-time-picker-input {
    height: 38px;
    background-color: #EBEBEB !important;
    border: 1px solid rgba(148,148,148,0.5) !important;
    box-sizing: border-box;
    border-radius: 28px !important;
    line-height: 1.8em  ;
  }
  .ant-time-picker {
    width: 100%;
  }
  .ant-btn:focus, .ant-btn:hover {
    color: #CA5353;
    border-color: #CA5353;
}
.ui.selection.dropdown .menu {
  border-radius: 0px 0px 28px 28px;
}
.ui.button {
  display: flex;
  font-family: kanit;
  font-size: 14px;
  font-weight: unset;
  background-color: #EBEBEB !important;
  color: rgba(0,0,0,0.25);
  border-radius: 28px;
  border: 1px solid #ccc2c2;
  width: 100%;
}
`
const Wrapper = styled.div`
  display: flex;
  align-self: center;
  text-align: center !important;
  flex-direction: column;
`
const Form = styled(SemanticForm)`
  width: 100%;
`
