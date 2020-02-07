import React from 'react'
import styled from 'styled-components'
import { Icon, Breadcrumb as SemanticBreadcrumb } from 'semantic-ui-react'

const Layout = {
  Wrapper: styled.div`
    display: inline-block;
    backface-visibility: hidden;
    user-select: none;

    // ! only works for semantic-ui
    && .breadcrumb {
      margin-left: 12px;
    }

    // ! only works for semantic-ui
    && .section {
      color: #00b69e;
      font-family: 'Sarabun';
      font-size: 18px;
      line-height: 23px;

      &.active {
        color: #231f20;
      }
    }
  `,
  Icon: styled(Icon)`
    && {
      color: #231f20;
      transform: scale(1.3);

      display: flex;
      align-items: center;
    }
  `,
}

/**
 * @param {import('semantic-ui-react').BreadcrumbProps} props
 */
function Breadcrumb({ className, ...moreProps }) {
  return (
    <Layout.Wrapper className={className}>
      <Layout.Icon fitted link name='arrow left'/>
      <SemanticBreadcrumb icon='right chevron' {...moreProps} />
    </Layout.Wrapper>
  )
}

export default Breadcrumb
