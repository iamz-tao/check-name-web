import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { Icon } from 'semantic-ui-react'
import { Link } from '~/routes'

const VendorHeader = (props) => {
  const header = get(props, 'header', '')
  const isBack = get(props, 'isBack', false)
  const buttons = get(props, 'buttons', '')
  const backUrl = get(props, 'backUrl', '')
  return (
    <Wrapper>
      <HeaderWrapper>
        <LabelWrapper>
          {
            isBack && (
              <Link route={backUrl} href={backUrl}>
                <CustomIcon name='arrow left' />
              </Link>
            )
          }
          <Header>{header}</Header>
        </LabelWrapper>
        {buttons}
      </HeaderWrapper>
    </Wrapper>
  )
}

export default VendorHeader

const Wrapper = styled.div`
  height: 56px;
  width: 100%;
  position: relative;
  z-index: 888;
`
const HeaderWrapper = styled.div`
  width: 100%;
  height: 56px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: fixed;
  // top: 109px;
  z-index: 1;
`
const Header = styled.span`
  font-size: 18px;
`
const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const CustomIcon = styled(Icon)`
  height: fit-content !important;
  margin: auto 15px auto 0px !important;
  cursor: pointer;
`
