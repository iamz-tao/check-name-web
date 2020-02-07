import React from 'react'
import styled from 'styled-components'
import { Form, Icon } from 'semantic-ui-react'
import get from 'lodash/get'
import Dropzone from 'react-dropzone'
import shortid from 'shortid'
import { FormattedMessage } from 'react-intl'

import { FileLoading } from '../FileUpload/components'

import DeleteIcon from '~/components/DeleteIcon'
import LoadingPulse from '~/components/LoadingPulse'

const CustomDropzone = (field) => {
  const {
    label = '',
    handleUploadImage,
    images,
    isLoading,
    handleRemoveImage,
    isBundle = false,
  } = field
  return (
    <FormWrapper>
      {
        label !== '' && (
          <Label>{label}</Label>
        )
      }
      {get(images, 'length') === 0 && (
        <UploadImage
          multiple
          onDrop={e => handleUploadImage(e)}
          isBundle={isBundle}
        >
          <UploadTextWrapper>
            <FileLoading
              open={isLoading}
            >
              <LoadingPulse isSmall />
            </FileLoading>
            <CustomIcon
              name='cloud upload'
              size='large'
            />
            &nbsp;&nbsp;
            <UploadText>
              <FormattedMessage
                id='click-here-to-upload'
                defaultMessage='Click here to upload'
              />
            </UploadText>
          </UploadTextWrapper>
        </UploadImage>
      )}
      {get(images, 'length') > 0 && (
        <ImageWrapper isBundle={isBundle}>
          {get(images, 'length') > 0 && (
            images.map(file => (
              <StyleImage>
                <ImagePreview
                  src={file.url}
                  alt='preview'
                  key={shortid.generate()}
                />
                <DeleteIcon
                  className='trash'
                  onClick={() => handleRemoveImage(file.url)}
                />
                <div className='overlay' />
              </StyleImage>
            ))
          )}
          <UploadImageSmall
            isBundle={isBundle}
            multiple
            onDrop={e => handleUploadImage(e)}
          >
            <UploadTextSmallWrapper>
              <FileLoading
                open={isLoading}
              >
                <LoadingPulse isSmall />
              </FileLoading>
              <CustomIcon
                name='cloud upload'
                size='large'
              />
              <UploadText>
                <FormattedMessage
                  id='click-to-upload'
                  defaultMessage='Click to upload'
                />
              </UploadText>
            </UploadTextSmallWrapper>
          </UploadImageSmall>
        </ImageWrapper>
      )}
    </FormWrapper>
  )
}

export default React.memo(CustomDropzone)


const FormWrapper = styled(Form.Field)`
  display: flex;
  justify-content: center;
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

  @media (max-width: 700px) {
    width: fit-content;
    position: absolute;
    left: 10%;
    top: -25px;
  }
`
const UploadImage = styled(Dropzone)`
  height: 100px;
  width: ${props => (props.isBundle ? '100%' : '380px')};
  border: 1px solid #DADDE1;
  border-radius: 4px;
  //margin: 0px 10px 10px 0px;

  @media (max-width: 700px) {
    width: ${props => (props.isBundle ? '100%' : '80%')};
    margin: ${props => (props.isBundle ? '0px 0px 16px 0px' : '5px 0px 15px 0px')} !important;
  }

  @media (max-width: 500px) {
    width: ${props => (props.isBundle ? '100%' : '90%')};
    margin: ${props => (props.isBundle ? '0px 0px 16px 0px' : '5px 0px 15px 0px')} !important;;
  }
`
const UploadImageSmall = styled(Dropzone)`
  height: 100px;
  width: 100px;
  border: 1px solid #DADDE1;
  border-radius: 4px;
  //margin: 0px 10px 10px 0px;

  @media (max-width: 700px) {
    margin: 5px 0px 15px 0px !important;
  }

  @media (max-width: 500px) {
    margin: 5px 0px 15px 0px !important;
  }
`
const UploadTextWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #929598;
  cursor: pointer;
`
const UploadTextSmallWrapper = styled(UploadTextWrapper)`
  flex-direction: column;
`
const UploadText = styled.span`
  font-family: Sarabun;
  font-size: 0.75em;
`
const CustomIcon = styled(Icon)`
  height: fit-content !important;
  margin: 0px !important;
`
const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  margin: 0px 0px 10px 0px;
  object-fit: cover;
`
const StyleImage = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  i {
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: rgba(0,0,0,0.5);
  }

  .trash {
      display: none;
      position: absolute;
      cursor: pointer;
      z-index: 1;
  }

  .overlay {
      width: 100%;
      height: 100%;
      display: none;
      position: absolute;
      background: white;
      opacity: 0.6;
  }

  :hover {
    .overlay {
      display: flex;
    }
    .trash {
      display: flex;
    }
  }
`
const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${props => (props.isBundle ? '100%' : '380px')};

  @media (max-width: 700px) {
    width: ${props => (props.isBundle ? '100%' : '80%')};
  }

  @media (max-width: 500px) {
    width: ${props => (props.isBundle ? '100%' : '90%')};
  }
`
