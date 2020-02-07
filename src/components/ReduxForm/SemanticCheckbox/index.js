import React from 'react'
import styled from 'styled-components'
import {
  Checkbox as SemanticCheckbox,
  Form,
} from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

const Checkbox = (field) => {
  const {
    fields,
    options,
    label,
  } = field

  const toggle = (e, target) => {
    if (target.checked) {
      // push
      fields.push(target.value)
    } else {
      // remove
      let index = -1
      for (let i = 0; i < fields.length; i += 1) {
        if (fields.get(i) === target.value) {
          index = i
          break
        }
      }

      fields.splice(index, 1)
    }
  }

  const arr = []
  for (let i = 0; i < fields.length; i += 1) {
    arr.push(fields.get(i))
  }

  return (
    <FormWrapper>
      {
        label && (
          <Label>{label}</Label>
        )
      }
      <Wrapper>
        <WrapperGroup>
          {
            options.map((opt) => {
              const obj = {
                id: opt,
                defaultMessage: opt,
              }

              return (
                <FormattedMessage
                  {...obj}
                >
                  {msg => (
                    <CustomCheckbox
                      checked={arr.indexOf(opt.toLowerCase()) > -1}
                      name={opt.toLowerCase()}
                      value={opt.toLowerCase()}
                      label={msg}
                      onClick={toggle}
                    />
                  )}
                </FormattedMessage>
              )
            })
          }
        </WrapperGroup>
        {/* {
          options.map(option => (
            <WrapperGroup>
              {
                option.map((opt) => {
                  const obj = {
                    id: opt,
                    defaultMessage: opt,
                  }
                  return (
                    <FormattedMessage
                      {...obj}
                    >
                      {msg => (
                        <CustomCheckbox
                          checked={arr.indexOf(opt.toLowerCase()) > -1}
                          name={opt.toLowerCase()}
                          value={opt.toLowerCase()}
                          label={msg}
                          onClick={toggle}
                        />
                      )}
                    </FormattedMessage>

                  )
                })
              }
        </WrapperGroup>
        ))
        }*/}
      </Wrapper>
    </FormWrapper>
  )
}

export default Checkbox

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  @media (max-width: 700px) {
    width: 80% !important;
    //margin: 5px 0px 15px 0px !important;
  }

  @media (max-width: 500px) {
    width: 90% !important;
    //margin: 5px 0px 15px 0px !important;
  }
`
const WrapperGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .ui.checkbox .box:before,
  .ui.checkbox input:checked~label:after {
    background: #F37021;
    color: white;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const CustomCheckbox = styled(SemanticCheckbox)`
  margin: 10px;
  margin-left: 0px;
`
const FormWrapper = styled(Form.Field)`
  display: flex;
  justify-content: flex-start;
  align-self: center;
  width: 100%;
  position: relative;
`
const Label = styled.label`
  width: 20%;
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  margin: 0px 20px 0px 0px !important;
  text-align: right;

  @media (max-width: 700px) {
    width: fit-content;
    position: absolute;
    left: 10%;
    top: -25px;
  }
`
