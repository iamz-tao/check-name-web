import React from 'react'
import styled from 'styled-components'
import ToolsTipIcon from '~/components/ToolsTipIcon'

const CustomToolsTipIcon = ({ content }) => (
  <IconWrapper>
    <ToolsTipIcon content={content} />
  </IconWrapper>
)

const DefaultForm = (props) => {
  const {
    isRequired,
    children,
    content,
    label,
    notShow,
    width,
    marginBottom,
  } = props
  return (
    <FormGroup marginBottom={marginBottom}>
      <LabelWrapper width={width}>
        { label }
        {
              isRequired && (
                <span style={{ color: 'red' }}>*</span>
              )
            }
        {
              content && (
                <CustomToolsTipIcon content={content} />
              )
            }

      </LabelWrapper>
      {
        notShow && (
          <LabelWrapper />
        )
      }
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
    </FormGroup>
  )
}


export default DefaultForm

const IconWrapper = styled.span`
  margin-left: 3px;
  position: relative;
  top: 2px;
`

const LabelWrapper = styled.label`
  margin-right: 16px;
  line-height: 41px;
  font-family: kanit !important;
  font-size: 14px !important;
  font-weight: 400;
  color: rgb(89.25,89.25,89.25) !important;
  text-align: ${props => props.align};
  min-width: ${props => (props.width ? props.width : '110px')};

`
const FormGroup = styled.div`
    width: 100%;
    justify-content: right;
    align-items: flex-start;
    display: flex;
    text-align: end;
margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '24px')};
  
    @media screen and (max-width: 640px) {
      flex-direction: column;
      align-items: flex-start;
    }
`
const ChildrenWrapper = styled.div`
  width: 100%;
`
