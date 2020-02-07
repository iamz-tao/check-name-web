import React, { useState, useEffect } from 'react'

import {
  Modal,
  Button,
} from 'semantic-ui-react'
import styled from 'styled-components'
import {
  TimePicker,
  Button as ButtonAntd,
  Dropdown,
  Menu,
  Icon,
} from 'antd'

import DefaultForm from '~/components/DefaultForm'

const format = 'HH:mm'


const CreateSection = (props) => {
  const {
    open,
    // handleInput,
    getTimeFrom,
    getTimeTo,
    handleButtonClick,
    getTimeFrom2,
    getTimeTo2,
    handleButtonClick2,
    handleModal,
    handleCancel,
    handleAddDay,
    addDay,
  } = props

  const day = (
    <Menu onClick={handleButtonClick}>
      <Menu.Item key='0' value='Sunday'>
        Sunday
      </Menu.Item>
      <Menu.Item key='1' value='Monday'>
      Monday
      </Menu.Item>
      <Menu.Item key='2' value='Tuesday'>
      Tuesday
      </Menu.Item>
      <Menu.Item key='3' value='Wednesday'>
      Wednesday
      </Menu.Item>
      <Menu.Item key='4' value='Thursday'>
      Thursday
      </Menu.Item>
      <Menu.Item key='5' value='Friday'>
      Friday
      </Menu.Item>
      <Menu.Item key='6' value='Saturday'>
      Saturday
      </Menu.Item>

    </Menu>
  )
  const day2 = (
    <Menu onClick={handleButtonClick2}>
      <Menu.Item key='0' value='Sunday'>
        Sunday
      </Menu.Item>
      <Menu.Item key='1' value='Monday'>
      Monday
      </Menu.Item>
      <Menu.Item key='2' value='Tuesday'>
      Tuesday
      </Menu.Item>
      <Menu.Item key='3' value='Wednesday'>
      Wednesday
      </Menu.Item>
      <Menu.Item key='4' value='Thursday'>
      Thursday
      </Menu.Item>
      <Menu.Item key='5' value='Friday'>
      Friday
      </Menu.Item>
      <Menu.Item key='6' value='Saturday'>
      Saturday
      </Menu.Item>

    </Menu>
  )


  return (
    <StyledWrapper
      closeOnDimmerClick={false}
      closeIcon
      open={open}
      onClose={() => handleModal()}
    >
      <Modal.Content>
        <Header>
          ADD SECTION
        </Header>
        <LabelWrapper>
          YEAR / SEMESTER : 2563/2
        </LabelWrapper>
        <Wrapper>
          <DefaultForm
            isRequired
            label='SELECT DAY'
            width='103px'
            marginBottom='6px'
          >
            <Dropdown overlay={day}>
              <Button>
        Select Day 1
                {' '} 
                <div style={{width: '76%'}}/>
                <Icon type='down' />
              </Button>
            </Dropdown>
          </DefaultForm>
          <BlankWrapper>

            <DefaultForm
              isFeature
              label=''
              width='103px'
              marginBottom='10px'
            >
              <ShowTimeWrapper>
                <TimePicker
                  format={format}
                  placeholder='Start Time'
                  onChange={getTimeFrom}
                />
      &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
                <TimePicker
                  format={format}
                  placeholder='End Time'
                  onChange={getTimeTo}
                />
              </ShowTimeWrapper>
            </DefaultForm>
          </BlankWrapper>
          {
            addDay && (
            <div>
              <DefaultForm
                isRequired
                label='SELECT DAY'
                width='103px'
                marginBottom='6px'
              >
                <Dropdown overlay={day2}>
                  <Button style={{ width: '100%' }}>
        Select Day 2
                    {' '}
                    <Icon type='down' />
                  </Button>
                </Dropdown>
              </DefaultForm>
              <BlankWrapper>

                <DefaultForm
                  isFeature
                  label=''
                  width='103px'
                  marginBottom='20px'
                >
                  <ShowTimeWrapper>
                    <TimePicker
                      format={format}
                      placeholder='Start Time'
                      onChange={getTimeFrom2}
                    />
      &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
                    <TimePicker
                      format={format}
                      placeholder='End Time'
                      onChange={getTimeTo2}
                    />
                  </ShowTimeWrapper>
                </DefaultForm>
              </BlankWrapper>
            </div>
            )
          }


          {
            !addDay && (
              <PlusWrpper>
                <LabelWrapper style={{ paddingRight: '8px' }}>
          ADD DAY
                </LabelWrapper>
                <ButtonPlus onClick={handleAddDay}>
              +
                </ButtonPlus>
              </PlusWrpper>
            )
          }

          <ButtonWrapper>
            <ButtonCancel onClick={handleCancel}>CANCEL</ButtonCancel>
            &nbsp;&nbsp;&nbsp;
            <ButtonSave onClick={handleModal}>SAVE</ButtonSave>
          </ButtonWrapper>
        </Wrapper>
      </Modal.Content>
    </StyledWrapper>
  )
}

export default CreateSection

const Header = styled.span`
  font-size: 18px;
  font-family: Kanit;
  font-weight: bold;
  color: black;
  display: flex;
  padding-left: 18px;
`
const ButtonSave = styled(ButtonAntd)`
  background: #CA5353 !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 28px !important;
  width: 100px !important;
  height: 38px !important;
  color: #fff !important;

`
const ButtonCancel = styled(ButtonAntd)`
  background: #FFFFFF !important;
  border: 1px solid #949494 !important;
  box-sizing: border-box !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 28px !important;
  width: 100px;
  height: 38px !important;
`
const ButtonWrapper = styled.div`
  display: flex;
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
const LabelWrapper = styled.label`
  display: flex;
  padding-left: 18px;
  line-height: 41px;
  font-family: kanit !important;
  font-size: 14px !important;
  font-weight: 400;
  color: rgb(89.25,89.25,89.25) !important;
`
const BlankWrapper = styled.div`

`
const ShowTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

`
const PlusWrpper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`
const ButtonPlus = styled(Button)`
  background: #FFFFFF !important;
  border: 1px solid rgba(36, 52, 69, 0.5) !important;
  box-sizing: border-box !important;
  border-radius: 12px !important;
  width: 32px !important;
  height: 32px;
  padding: 0px 0px 4px 8px !important;
  border: 1px solid rgba(36, 52, 69, 0.5) !important;
  font-size: 28px !important;
`
