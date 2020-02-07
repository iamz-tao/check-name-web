import React from 'react'
import styled from 'styled-components'
import { Form, Input, Icon } from 'semantic-ui-react'
import shortid from 'shortid'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

const Chip = (props) => {
  const tag = get(props, 'tag')
  const handleDeleteTag = get(props, 'handleDeleteTag')
  return (
    <ChipBox>
      <ChipText>{tag}</ChipText>
      <DeleteButton onClick={() => handleDeleteTag(tag)}>
        <Icon name='delete' />
      </DeleteButton>
    </ChipBox>
  )
}

const HashTag = ({ fields, label, isAvail }) => {
  const inputID = shortid.generate()
  return (
    <FormWrapper>
      {
        label && (
          <Label>{label}</Label>
        )
      }
      <HashTagsWrapper
        isAvail={isAvail}
      >
        <Wrapper>
          {fields.map((hobby, index) => (
            <Chip
              key={shortid.generate()}
              tag={fields.get(index)}
              handleDeleteTag={() => fields.remove(index)}
            />
          ))}
          <FormattedMessage
            id='add-tag'
            defaultMessage='Add a tag ...'
          >
            {msg => (
              <TagInput
                id={inputID}
                transparent
                autoComplete='off'
                placeholder={msg}
                onKeyDown={({ target, keyCode }) => {
                  if (keyCode === 13 && target.value !== '') {
                    fields.push(target.value)
                    document.getElementById(inputID).value = ''
                  } else if (keyCode === 8 && target.value === '') {
                    fields.remove(fields.length - 1)
                  }
                }}
              />
            )}
          </FormattedMessage>
        </Wrapper>
      </HashTagsWrapper>
    </FormWrapper>
  )
}

export default HashTag

// language=SCSS prefix=&{ suffix=}
const FormWrapper = styled(Form.Field)`
    display: flex;
    justify-content: center;
    align-self: center;
    width: 100%;
    position: relative;
`
// language=SCSS prefix=&{ suffix=}
const Label = styled.label`
    width: 20%;
    display: flex !important;
    justify-content: flex-end !important;
    align-items: center !important;
    margin: 0px 20px 0px 0px !important;
    text-transform: capitalize !important;
    text-align: right;

    @media (max-width: 700px) {
      width: fit-content;
      position: absolute;
      left: 10%;
      top: -25px;
    }
`
const HashTagsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: ${props => (props.isAvail ? '100%' : '380px')};
  min-height: 62px;

  //@media (max-width: 700px) {
  //  width: 80% !important;
  //  margin: 5px 0px 15px 0px !important;
  //}
  //
  //@media (max-width: 500px) {
  //  width: 90% !important;
  //  margin: 5px 0px 15px 0px !important;
  //}
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #DADDE1;
  border-radius: 4px;
`
const ChipBox = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  border: 1px solid #DADDE1;
  border-radius: 5px;
  background: #FF5A5F;
  color: white;
  margin: 10px;
  word-break: break-all;
`
const ChipText = styled.span`
  font-size: 1em;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 18px;
`
const DeleteButton = styled.div`
  height: auto;
  width: 20px;
  border-radius: 0px 10px 10px 0px !important;
  background: #FF5A5F !important;
  color: white !important;
  display: flex;
  justify-content: center;
  align-items: center;
`
const TagInput = styled(Input)`
  height: 30px;
  width: fit-content !important;
  margin: 10px;
  font-family: Sarabun !important;
  font-size: 14px !important;
`
