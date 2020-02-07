import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Box from '~/components/css/Box'
import Typography from '~/components/css/Typography'
import media from '~/styles/media'

// import { productTypes } from '~/config/constants'

// prettier-ignore
/** @param {{ select?: boolean }} props */
const itemSelect = props => props.select && `
  color: white;
  font-weight: 500;
  background-color: #f37021;
`

export const Layout = {
  Root: styled.div`
    overflow-x: scroll;

    ::-webkit-scrollbar,
    ::-webkit-scrollbar-thumb {
      display: none;
    }
  `,
  // TODO: correct item spacing to match the design
  List: styled(Box)`
    height: 95px !important;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    ${media(1024)`
      display: none;
    `}
  `,
  Item: styled(Typography.Body)`
    width: 84px;
    height: 42px;
    border-radius: 4px;

    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
    
    color: ${props => (props.isCompanyMedia ? '#000' : '#b3b3b3')};
    cursor: ${props => (props.isCompanyMedia ? 'pointer' : 'not-allowed')};

    ${itemSelect}
  `,
}

const TabMenu = (props) => {
  const {
    selected,
    handleSelect,
    productTypes,
    companyMediaTypes,
  } = props
  return (
    <Layout.Root>
      <Layout.List>
        {
          productTypes.map(({ label, value }) => (
            <Layout.Item
              select={selected.indexOf(value) > -1}
              onClick={() => {
                if (selected.indexOf(value) === -1 && companyMediaTypes.includes(value)) {
                  handleSelect(value)
                }
              }}
              key={value}
              isCompanyMedia={companyMediaTypes.includes(value)}
            >
              {label}
            </Layout.Item>
          ))
        }
      </Layout.List>
    </Layout.Root>
  )
}

TabMenu.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(Array),
}

TabMenu.defaultProps = {
  selected: [],
}
export default TabMenu
