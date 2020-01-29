import React from 'react'
import styled from 'styled-components'
import { Anchor } from 'antd'

const { Link } = Anchor

const StickyOutline = (props) => {
  const {
    steps,
  } = props

  return (
    <Wrapper>
      <StickyWrapper
        offsetTop={180}
        affix
      >
        {
          steps.map(step => (
            <Link
              href={step.name}
              title={step.title}
            />
          ))
        }
      </StickyWrapper>
    </Wrapper>
  )
}

StickyOutline.propTypes = {}

export default StickyOutline

const StickyWrapper = styled(Anchor)`
   border: 1px solid #E1E1E1;
   background-color: white;
   box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
   padding: 10px 20px 10px 20px;
   border-radius: 4px;
   //width: 85%;
    min-width: 230px;
    max-width: 280px;
    //width: 100%;
    text-align: left;
   
   .ant-anchor-link-title-active {
      font-weight: bold !important;
   }
   
   .ant-anchor-ink-ball {
      background-color: white;
          // border: 2px solid #1890ff;
      width: 20px;
      height: 20px;
      border: 5px solid #FF5A5F;
      border-radius: 25px;
   }
   .ant-anchor-link-title {
      font-size: 15px;
      font-weight: 100;
      color: #231F20;
      // padding-top: 8px;
   }
   
   .ant-anchor-link {
      padding: 25px;
   }
   
   @media screen and (max-width: 1100px) {
    display: none;
   }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: 0;
`
