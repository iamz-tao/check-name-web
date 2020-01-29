import React from 'react'
import styled from 'styled-components'
import { Form } from 'semantic-ui-react'
import Chips from '~/components/Chips'

const HashTag = (field) => {
  const {
    label,
    chips,
    handleAddTag,
    handleDeleteTag,
  } = field
  return (
    <FormWrapper>
      <Label>{label}</Label>
      <HashTagsWrapper>
        <Chips
          chips={chips}
          handleAddTag={e => handleAddTag('addTag', e)}
          handleDeleteTag={e => handleDeleteTag('deleteTag', e)}
        />
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
  width: 380px;
  min-height: 62px;

  @media (max-width: 700px) {
    width: 80% !important;
    margin: 5px 0px 15px 0px !important;
  }

  @media (max-width: 500px) {
    width: 90% !important;
    margin: 5px 0px 15px 0px !important;
  }
`
