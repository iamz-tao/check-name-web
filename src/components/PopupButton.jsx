import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

export const Layout = {
  Root: styled.div`
    width: fit-content;
    height: 32px;
    padding: 8px;

    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dadde1;

    display: flex;
    align-items: center;

    user-select: none;
    cursor: pointer;
  `,
  Icon: styled(Icon)`
    color: #666666;

    display: inline-flex !important;
    justify-content: center;
    align-items: center;
  `,
  // TODO: refactor to /components/css/Typography
  Label: styled.span`
    display: inline-block;
    margin-left: 5px;

    font-family: 'Sarabun';
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #333333;
  `,
}

/**
 * @param {object} props
 * @param {import('semantic-ui-react').IconProps} props.iconProps
 * @param {string} props.children button label
 */
function PopupButton({ iconProps, children }) {
  return (
    <Layout.Root>
      <Layout.Icon fitted {...iconProps} />
      <Layout.Label>{children}</Layout.Label>
    </Layout.Root>
  )
}

export default PopupButton
