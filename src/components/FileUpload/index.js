import React from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import format from 'date-fns/format'
import PropTypes from 'prop-types'
import { fromJS } from 'immutable'
import shortid from 'shortid'
import { FormattedMessage } from 'react-intl'
import {
  LoadingIcon,
} from './components'

// language=SCSS prefix=&{ suffix=}
export const FileLoading = styled.div`
    top:0;
    left:0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: ${props => (props.open ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    font-size: 3em;
`

const Upload = (props) => {
  const {
    title,
    open,
    files,
    handleDownload,
    ...restInput
  } = props
  return (
    <FormGroup>
      <Label />
      <FileWrapper>
        <FileLoading
          open={open}
        >
          <LoadingIcon
            name='compass outline'
            loading
          />
        </FileLoading>
        {title}
        {
          files && files.map(file => (
            <FileRow key={shortid.generate()}>
              <DisplayFile
                onClick={() => handleDownload(file.get('filename'))}
              >
                <span className='fileName'>
                  {file.get('filename')}
                </span>
              </DisplayFile>

              <DisplayTime>
                <span>
                  {format(new Date(+file.get('created')), 'DD MMM YYYY HH:mm')}
                </span>
              </DisplayTime>
            </FileRow>
          ))
        }
        <UploadWrapper
          onClick={() => document.getElementById(`${title}_upload`).click()}
        >
          <UploadInput
            id={`${title}_upload`}
            type='file'
            {...restInput}
          />
          <span>
            <Icon name='cloud upload' />
            <FormattedMessage
              id='click-here-to-upload'
              defaultMessage='Click here to upload'
            />
          </span>
        </UploadWrapper>
      </FileWrapper>
    </FormGroup>
  )
}

Upload.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  files: PropTypes.instanceOf(Map),
  handleDownload: PropTypes.func,
}
Upload.defaultProps = {
  files: fromJS([]),
  handleDownload: () => {
  },
}

export default Upload

const FormGroup = styled.div`
    justify-content: right;
    align-items: center;
    display: flex;
    padding: 10px 20px;
    text-align: end;
  
    @media screen and (max-width: 500px) {
      flex-direction: column;
      align-items: flex-start;
    }
`

const Label = styled.label`
   width: 150px;
    margin-right: 5px;
    line-height: 32px;
    
    @media screen and (max-width: 500px) {
      align-self: end;
      width: auto;
    }
`

// language=SCSS prefix=&{ suffix=}
const FileRow = styled.div`
    width: 100%;
    display: flex;
    cursor: pointer;

`

// language=SCSS prefix=&{ suffix=}
const DisplayFile = styled.div`
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
`

// language=SCSS prefix=&{ suffix=}
const DisplayTime = styled.div`
    flex: 1;
    text-align: right;
`

// language=SCSS prefix=&{ suffix=}
const UploadInput = styled.input`
    width: 100%;
    position: absolute;
  display: none;
`

// language=SCSS prefix=&{ suffix=}
const UploadWrapper = styled.div`
    position: relative;
    //z-index: 11111;
`

const FileWrapper = styled.div`
  padding: 10px 20px;
  position: relative;
  width: 100%;
  border: 1px solid ${props => (props.error ? 'red' : '#DADDE1')} !important;
  border-radius: 4px;
  font-family: Sarabun !important;
  font-size: 14px !important;  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  //> div {
  //  position: relative;
  //  margin: 0;
  //  outline: 0;
  //  -webkit-appearance: none;
  //  tap-highlight-color: rgba(255,255,255,0);
  //  line-height: 24px;
  //  padding: .67857143em 1em;
  //  font-size: 14px;
  //  background: #fff;
  //  border: 1px solid rgba(34,36,38,.15);
  //  color: rgba(0,0,0,.87);
  //  border-radius: .28571429rem;
  //  box-shadow: 0 0 0 0 transparent inset;
  //  transition: color .1s ease,border-color .1s ease;
  //}
  //
  > div span {
    color: #929598;
    font-size: 12px;
  }
  //
  > div span.fileName {
    color: #00A699;
    text-decoration: underline;
  }
  //
  //i {
  //  margin: 0 0.6rem 0 0 !important;
  //}
  //
  //input {
  //  opacity: 0;
  //  cursor: pointer;
  //  position: absolute;
  //  width: 100%;
  //  height: 100%;
  //  left: 0;
  //  top: 0;
  //}
`
