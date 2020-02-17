import React from 'react'
import styled from 'styled-components'
import {
  Menu,
  Dropdown,
} from 'semantic-ui-react'
import { Link } from '~/routes'

const HeaderProfessor = () => (
  <HeaderWrapper>
    <CustomMenu borderless>
      <CustomDropdown
        item
        text='SUBJECT'
      >
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link
              to='/professor'
              href='/professor'
            >
              <LinkButton>
                <ItemWrapper>
                  <ItemHeader>
                    ALL SUBJECTS
                  </ItemHeader>
                  <ItemDetail>
                    List all Subjects.
                  </ItemDetail>
                </ItemWrapper>
              </LinkButton>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link
              to='/open-section'
              href='/open-section'
            >
              <LinkButton>
                <ItemWrapper>
                  <ItemHeader>
                    OPEN SECTION
                  </ItemHeader>
                  <ItemDetail>
                    Open section and create new subject.
                  </ItemDetail>
                </ItemWrapper>
              </LinkButton>
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </CustomDropdown>

      <Link
        to='/approve-student'
        href='/approve-studentv'
      >
        <CustomMenuItem
          link
        >
          NISIT APPROVE
        </CustomMenuItem>
      </Link>

      <Link>
        <CustomMenuItem
          link
        >
          REPORT
        </CustomMenuItem>
      </Link>
    </CustomMenu>
  </HeaderWrapper>
)

export default HeaderProfessor

const HeaderWrapper = styled.div`
  display: flex;
  height: 64px;
  background: #4c4c4c;
  
  @media screen and (max-width: 800px) {
    display: none;
  }
`
const CustomMenu = styled(Menu)`
  background: ${props => props.theme.colors.adminNavbar} !important;
  border: none !important;
  box-shadow: none !important;
`
const CustomDropdown = styled(Dropdown)`
  color: white !important;
  font-size: 16px !important;
  ${props => props.actived === 'true' && css`
    background-color: ${props.theme.colors.adminActive} !important;
  `}

  &:hover {
    background-color: ${props => props.theme.colors.adminActive} !important;
  }
`
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const LinkButton = styled.a`
  color: black;

  :hover {
    color: black;
  }
`

const CustomMenuItem = styled(Menu.Item)`
  color: white !important;
  font-size: 16px !important;
  
  ${props => props.actived === 'true' && css`
    background-color: ${props.theme.colors.adminActive} !important;
  `}

  &:hover {
    background-color: ${props => props.theme.colors.adminActive} !important;
  }
`
const ItemDetail = styled.span`
  font-size: 12px;
  color: #929598;
`

const ItemHeader = styled.span`
    font-size: 1em;
    margin: 0;
    color: #929598;
    cursor: pointer;
`
