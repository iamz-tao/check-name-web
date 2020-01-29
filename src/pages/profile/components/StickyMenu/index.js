import React from 'react'
import Steps, { Step } from 'rc-steps'
import { Icon } from 'semantic-ui-react'
import { Sticky } from 'react-sticky'
import styled from 'styled-components'
import PropsType from 'prop-types'

const StickyMenu = (props) => {
  const {
    currentStep,
    steps,
    scrollTo,
  } = props

  return (
    <Sticky topOffset={-119} bottomOffset={160}>
      { ({ style }) => (
        <StepsStyled
          direction='vertical'
          current={currentStep}
          style={{
            ...style,
            top: `${style.top + 119}px`,
            marginTop: '62px',
          }}
        >
          {
            steps.map((step, i) => (
              <Step
                title={step.title}
                onClick={() => scrollTo(step.name)}
                icon={<Icon name={currentStep === i ? 'dot circle' : 'circle outline'} />}
              />
            ))
          }
        </StepsStyled>
      ) }
    </Sticky>
  )
}

StickyMenu.propTypes = {
  currentStep: PropsType.number.isRequired,
  steps: PropsType.instanceOf(Array).isRequired,
  scrollTo: PropsType.func.isRequired,
}

export default StickyMenu

// language=SCSS prefix=&{ suffix=}
const StepsStyled = styled(Steps)`
  border: 1px solid #E1E1E1;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
  padding: 10px;
  border-radius: 4px;

  .rc-steps-item {
    cursor: pointer;
  }

  .rc-steps-icon {
    font-size: 24px !important;
  }

  .rc-steps-item-process .rc-steps-item-icon>.rc-steps-icon {
    color: #FF5A5F;
  }

  .rc-steps-item-finish .rc-steps-item-icon>.rc-steps-icon {
    color: #ccc;
  }

  .rc-steps-item-finish .rc-steps-item-tail:after {
    background-color: #e9e9e9;
  }

  .rc-steps-item-content {
    text-align: left;
  }

  .rc-steps-item-process .rc-steps-item-title,  .rc-steps-item-finish .rc-steps-item-title {
    color: #000;
  }

  .rc-steps-item-title {
    color: #000;
    font-weight: 400;
  }

  .rc-steps-item-process .rc-steps-item-title {
    font-weight: 700;
  }

  .rc-steps-item-process::before {
    content: '';
    width: 85%;
    background-color: rgba(255,90,95,0.3);
    border-radius: 0 15px 15px 0;
    height: 34px;
    position: absolute;
    left: -10px;
    top: -4px;
  }
`
