import React, { Component } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import {
  Form as SemanticForm,
  Modal,
} from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form/immutable'
import { createStructuredSelector } from 'reselect'


import styled from 'styled-components'
import { yearAction } from '~/modules/admin/actions'
import {
  SemanticInput,
  DropdownWithLabel,
} from '~/components/ReduxForm'
import DefaultForm from '~/components/DefaultForm'
import FormButton from '~/components/Form/Button'

const FORM_NAME = 'CREATE_YEAR'
class CreateYear extends Component {
  handleInput = (type, e) => {
    const { change } = this.props
    change(type, e)
  }

  handleCreateYear = (values) => {
    const { createYear, handleModal } = this.props
    createYear({
      data: {
        semester: values.get('semester'),
        year: values.get('year'),
      },
    })

    handleModal()
  }


  render() {
    const {
      open,
      handleModal,
      handleSubmit,
    } = this.props
    const semesters = [
      {
        key: 1,
        text: 'First',
        value: 'FIRST',
      },
      {
        key: 2,
        text: 'Second',
        value: 'SECOND',
      },
      {
        key: 3,
        text: 'Summer',
        value: 'SUMMER',
      },
    ]
    return (
      <StyledWrapper
        closeOnDimmerClick={false}
        closeIcon
        open={open}
        onClose={() => handleModal()}
      >
        <Form onSubmit={handleSubmit(this.handleCreateYear)}>

          <Modal.Content>
            <Header>
              ADD YEAR
            </Header>
            <Wrapper>

              <DefaultForm
                isRequired
                label='YEAR'
                width='142px'
              >
                <Field
                  required
                  name='year'
                  placeholder='Year'
                  component={SemanticInput}
                />

              </DefaultForm>
              <DefaultForm
                isRequired
                label='SELECT SEMESTER'
                width='142px'
                marginBottom='6px'
              >
                <Field
                  required
                  name='semester'
                  placeholder='Select Semester'
                  component={DropdownWithLabel}
                  options={semesters}
                  handleInput={this.handleInput}
                />
              </DefaultForm>
              <BlankWrapper />

              <ButtonWrapper>
                <FormButton
                  isFilter
                  type='reset'
                  txtButton='CANCEL'
                  width='50%'
                  onClick={(e) => {
                    e.preventDefault()
                    handleModal()
                  }}
                />
                  &nbsp; &nbsp;
                <FormButton
                  isFilter
                  colorButton='#CA5353'
                  type='submit'
                  txtButton='CREATE'
                  width='50%'
                  onClick={() => {
                  }}
                />
              </ButtonWrapper>
            </Wrapper>
          </Modal.Content>
        </Form>

      </StyledWrapper>
    )
  }
}


const mapStateToProps = (state, props) => createStructuredSelector({
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  createYear: yearAction.createYear,
}, dispatch)

const withForm = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withForm,
)(CreateYear)

const Header = styled.span`
  font-size: 18px;
  font-family: Kanit;
  font-weight: bold;
  color: black;
  display: flex;
  padding-left: 18px;
  margin-bottom: 22px;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const StyledWrapper = styled(Modal)`
  max-width: 600px !important;
  min-width: 300px;
  text-align: center !important;
  padding: 26px 26px 0px 26px;
  height: fit-content;
  background: #FFFFFF;
  border: 1px solid #C4C4C4 !important;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  font-family: kanit;
  font-size: 14px !important;
 
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
const BlankWrapper = styled.div`

`
const Form = styled(SemanticForm)`
  width: 100%;
`
