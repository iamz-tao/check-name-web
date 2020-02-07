import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Icon,
  // Input,
} from 'semantic-ui-react'
import get from 'lodash/get'
import PropTypes from 'prop-types'

const CardForm = (props) => {
  const title = get(props, 'title', '')
  const height = get(props, 'height', '476px')
  const canSearch = get(props, 'canSearch', false)
  // const keyword = get(props, 'keyword', '')
  // const handleInputChange = get(props, 'handleInputChange', () => {
  // })
  const handleModal = get(props, 'handleModal', '')
  const { disabled } = props

  return (
    <CardInfo height={height}>
      <CardHeader>
        <CardHeaderLeft>
          <CardTitle>
            {title}
          </CardTitle>
        </CardHeaderLeft>
        {canSearch && (
          <CardHeaderRight>
            <AddButton
              onClick={handleModal}
              hidden={disabled}
            >
              <Icon name='plus' />
            </AddButton>
          </CardHeaderRight>
        )}
      </CardHeader>
      <CardBody>
        {get(props, 'children')}
      </CardBody>
    </CardInfo>
  )
}

CardForm.propTypes = {
  disabled: PropTypes.bool,
}

CardForm.defaultProps = {
  disabled: true,
}

export default CardForm

// language=SCSS prefix=&{ suffix=}
const CardInfo = styled.section`
    position: relative;
    background-color: #fff;
    padding-bottom: 20px;
    margin-bottom: 25px;
    padding: 0px 42px 20px 42px;
    height: ${props => (props.height ? props.height : 'fit-content')};
    background: #FFFFFF;
    border: 1px solid #C4C4C4;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 18px;
`
const CardTitle = styled.span`
    background: #CA5353;
    border-radius: 0px 0px 12px 12px;
    font-weight: 600;
    padding: 10px 30px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    color: white;
    font-size: 18px;
    font-family: Kanit;
`
const CardBody = styled.section`
    padding-top: 25px;
`
const CardHeader = styled.header`
    display: flex;
`
const CardHeaderLeft = styled.div`
    display: flex;
    flex: 1;
`
const CardHeaderRight = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`
const AddButton = styled.div`
    color: #fff;
    display: flex !important;
    font-size: 1.5rem;
    background-color: #4C4C4C;
    padding: 0 10px 10px;
    align-items: center;
    margin-left: 15px;
    margin-right: 1.5rem;
    cursor: pointer;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    &:hover {
      opacity: 0.7;
    }

    i {
      margin: 0;
    }
`

