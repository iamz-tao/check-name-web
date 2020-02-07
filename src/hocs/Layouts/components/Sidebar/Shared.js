import styled, { css } from 'styled-components'

export const Menus = styled.ul`
  padding:0;
  margin: 0;
  display: flex;
  flex-direction: column;
`

export const Menu = styled.li`
  position: relative;
  text-transform: capitalize;
  cursor: pointer;
  font-weight: 300;
  font-family: 'Sarabun' !important;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  /* ${props => props.submenu && css`
      &:before {
        color: ${props.theme.colors.white};
        content: '◀';
        top: 0;
        line-height: ${57}px;
        position: absolute;
        right: 5px;
        font-size: 1em;
        transform: rotate(270deg);
      }
  `} */
  
  ul {
    padding: 0;
    color: ${props => props.theme.colors.default};
    display: none;
    position: absolute;
    background-color: ${props => props.theme.colors.secondary};
    
    li {
      list-style: none;
    }
  }
  
  &:hover {
    opacity: 0.7;
    ${props => props.submenu && css`
      margin-bottom: ${props.childrenHeight || 100}px;
    `}
    
    ::before, a {
      // color: ${props => props.theme.colors.white};
    }

    ul {
      top: 50px;
      z-index: 111;
      display: block;
      background-color: ${props => props.theme.colors.white};
      width: 100%;
      left: 0;
      li {
        padding: 15px 20px;
      }
      li:hover {
        color: ${props => props.theme.colors.white};
        background-color: ${props => props.theme.colors.primary};
      }
    }
   }
  
  :first-child {
    height: 57px;
  }
  :nth-child(1),
  :nth-child(2),
  :nth-last-child(2),
  :last-child {
    opacity: 1;
    color: ${props => props.theme.colors.default};
    background-color: ${props => props.theme.colors.white};  
    ${props => props.submenu && css`
      &:before {
        color: ${props.theme.colors.default};
        content: '◀';
        top: 0;
        line-height: ${57}px;
        position: absolute;
        right: 5px;
        font-size: 1em;
        transform: rotate(270deg);
      }
  `}
  }
`

export const Closeable = styled.div`
  z-index: 111;
  font-size: 1.5em;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
`

export const SideMenu = styled.div`
  position: absolute;
  width: 80%;
  min-width: 320px;
  height: 100vh;
  background-color: ${props => props.theme.colors.white};
  z-index: 1111111;
  transition: 0.7s;
  display: none;
  /* left: ${props => (props.sidebar ? 0 : -500)}%; */
  @media screen and (min-width: 800px) {
    left: -500%;
  }
`

export const SidebarWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: -1;
    transition: 0.5s;
    opacity: 0;
    ${props => props.sidebar && css`
      opacity: 0.5;
      z-index: 10;
    `};
    /* @media screen and (min-width: 800px) {
      display: none;
    } */
`

export const Profile = styled.p`
  position: relative;
  text-transform: initial;
  line-height: 20px;
  font-weight: 500;
  ::before {
    text-transform: capitalize;
    content: attr(data-content);
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 0.7em;
    top: -15px;
    left: 0;
    color: ${props => props.theme.colors.label};
  }
`
