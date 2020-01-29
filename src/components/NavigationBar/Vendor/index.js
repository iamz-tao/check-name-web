import React from 'react'
import styled, { css } from 'styled-components'
import get from 'lodash/get'
import { Icon } from 'semantic-ui-react'

import { generate } from 'shortid'

import { Link } from '~/routes'

const VendorHeader = (props) => {
  const headerTitle = get(props, 'headerTitle', '')
  const breadcrumb = get(props, 'breadcrumb', [])
  const isBack = get(props, 'isBack', false)
  const backUrl = get(props, 'backUrl', '')
  const component = get(props, 'component', '')

  return (
    <Wrapper>
      <HeaderWrapper>
        <LabelWrapper>
          {
            isBack ? (
              <Link
                route={backUrl}
                href={backUrl}
              >
                <div>
                  <CustomIcon name='arrow left' />
                  <Breadcrumb>{headerTitle}</Breadcrumb>
                </div>
              </Link>
            ) : (
              <Header>{headerTitle}</Header>
            )
          }
          {
            breadcrumb.map(bc => (
              <Link
                key={generate()}
                route={bc.link}
                href={bc.link}
              >
                <Breadcrumb
                  disable={bc.link === '#'}
                >
                  {` > ${bc.title}`}
                </Breadcrumb>
              </Link>
            ))
          }
        </LabelWrapper>
        {component}
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
  height: 96px;
  background: #4C4C4C;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: fixed;
  z-index: 1;
`
const Header = styled.span`
  color: white;
  font-family: Kanit;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
`

const Breadcrumb = styled(Header)`
    margin-left: 5px;
    ${props => !props.disable && css`
      color: #00b69e;
      cursor: pointer;
    `}   
    @media (max-width: 900px) {
      width: 200px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    @media (max-width: 700px) {
      width: 170px;
    }
    @media (max-width: 500px) {
      width: 135px;
    }
    @media (max-width: 400px) {
      width: 70px;
    }                           
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
