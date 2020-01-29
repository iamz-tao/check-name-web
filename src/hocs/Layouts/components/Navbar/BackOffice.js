import React from 'react'
import {
  Menu,
  Dropdown,
} from 'semantic-ui-react'
import styled from 'styled-components'

const BackOfficeNavbar = () => (
  <HeaderWrapper>
    <CustomMenu borderless>
      <CustomMenuItem link active>Dashboard</CustomMenuItem>
      <CustomDropdown item text='Orders'>
        <Dropdown.Menu>
          <Dropdown.Item>1</Dropdown.Item>
          <Dropdown.Item>2</Dropdown.Item>
        </Dropdown.Menu>
      </CustomDropdown>
      <CustomDropdown item text='Products'>
        <Dropdown.Menu>
          <Dropdown.Item>1</Dropdown.Item>
          <Dropdown.Item>2</Dropdown.Item>
        </Dropdown.Menu>
      </CustomDropdown>
      <CustomDropdown item text='Marketing'>
        <Dropdown.Menu>
          <Dropdown.Item>1</Dropdown.Item>
          <Dropdown.Item>2</Dropdown.Item>
        </Dropdown.Menu>
      </CustomDropdown>
      <CustomDropdown item text='Users'>
        <Dropdown.Menu>
          <Dropdown.Item>1</Dropdown.Item>
          <Dropdown.Item>2</Dropdown.Item>
        </Dropdown.Menu>
      </CustomDropdown>
      <CustomMenuItem link>Blog</CustomMenuItem>
      <CustomDropdown item text='Approval'>
        <Dropdown.Menu>
          <Dropdown.Item>1</Dropdown.Item>
          <Dropdown.Item>2</Dropdown.Item>
        </Dropdown.Menu>
      </CustomDropdown>
      <CustomMenuItem link>Accounting</CustomMenuItem>
    </CustomMenu>
  </HeaderWrapper>
)

export default BackOfficeNavbar

const HeaderWrapper = styled.div`
  display: flex;
  height: 52px;
  background: #F37021;
`
const CustomMenu = styled(Menu)`
  background: #F37021 !important;
  border: none !important;
  box-shadow: none !important;
`
const CustomMenuItem = styled(Menu.Item)`
  color: white !important;
  font-size: 16px !important;
`
const CustomDropdown = styled(Dropdown)`
  color: white !important;
  font-size: 16px !important;
`
