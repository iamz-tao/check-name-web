import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

// language=SCSS prefix=&{ suffix=}
export const FormGroup = styled.section`
    display: flex;
    text-align: right;
    align-items: center;
    margin: 15px 0;
    width: 90%;
`

// language=SCSS prefix=&{ suffix=}
export const LabelWrapper = styled.header`
    flex: 2;
`

// language=SCSS prefix=&{ suffix=}
export const InputFileWrapper = styled.section`
    flex: 4;
    margin-left: 0;
    text-align: left;

    > div {
      position: relative;
      margin: 0;
      outline: 0;
      -webkit-appearance: none;
      tap-highlight-color: rgba(255, 255, 255, 0);
      line-height: 24px;
      padding: .67857143em 1em;
      font-size: 14px;
      background: #fff;
      border: 1px solid rgba(34, 36, 38, .15);
      color: rgba(0, 0, 0, .87);
      border-radius: .28571429rem;
      box-shadow: 0 0 0 0 transparent inset;
      transition: color .1s ease, border-color .1s ease;
    }

    > div span {
      color: #929598;
      font-size: 12px;
    }

    > div span.fileName {
      color: #00A699;
      text-decoration: underline;
    }

    i {
      margin: 0 0.6rem 0 0 !important;
    }

    input {
      opacity: 0;
      cursor: pointer;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
`


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

// language=SCSS prefix=&{ suffix=}
export const LoadingIcon = styled(Icon)`
    font-size: 3em;
`

// language=SCSS prefix=&{ suffix=}
export const ButtonWrapper = styled.div`
    flex: ${props => (props.showButton ? 2 : 1)};
    text-align: left;
    .ui.button {
      padding: 12px 12.5px;
    }
`
