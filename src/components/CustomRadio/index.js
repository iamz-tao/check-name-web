import React from 'react'
import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import shortid from 'shortid'

const CustomRadio = (props) => {
  const {
    label,
    options,
    onToggle,
    value,
  } = props
  return (
    <Grid container>
      <Grid.Column
        width={4}
        textAlign='right'
        verticalAlign='middle'
      >
        <span>
          { label }
        </span>
      </Grid.Column>

      <Grid.Column width={10}>
        <ToggleWrapper>
          {
            options.map(option => (
              <ToggleItem
                key={shortid.generate()}
                active={(value === option.value).toString()}
                onClick={() => onToggle(option.value)}
                value={option.value}
              >
                {option.label}
              </ToggleItem>
            ))
          }
        </ToggleWrapper>
      </Grid.Column>
    </Grid>
  )
}

CustomRadio.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(Object),
}

CustomRadio.defaultProps = {
  options: [],
  value: '',
}

// language=SCSS prefix=&{ suffix=}
const ToggleWrapper = styled.div`
    flex: 1;
    display: flex;
    > * {
      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
`

// language=SCSS prefix=&{ suffix=}
const ToggleItem = styled.div`
    padding: 5px 20px;
    background-color: ${props => (props.active ? '#FF5A5F' : '#F5F6F7')};
    color: ${props => (props.active ? '#fff' : '#231F20')};
    border: 1px solid #DADDE1;
    cursor: pointer;
    text-transform: capitalize;
    
  
`

export default CustomRadio
