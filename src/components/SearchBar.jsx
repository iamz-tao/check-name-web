import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

export const Layout = {
  // TODO: refactor to /components/css
  Root: styled.div`
    min-width: 300px;
    height: 32px;
    
    width: 100%;

    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dadde1;

    display: flex;
  `,
  Input: styled.input`
    height: 100%;
    width: calc(100% - 38px);
    padding: 0;
    padding-left: 9px;

    font-family: 'Sarabun';
    font-weight: 400; /* regular */
    font-size: 14px;
    line-height: 18px;

    border-radius: inherit;
    border: none;
    outline: none;

    &::placeholder {
      color: #dadde1;
    }
  `,
  Button: styled.button`
    width: 39px;
    height: 32px;
    padding: 2px 7px;
    cursor: pointer;

    position: relative;
    top: -1px;
    right: -1px;

    color: #fff;
    font-size: 1.3em;
    background-color: #f37021;

    outline: none;
    border: none;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
  `,
}

function SearchBar(props) {
  const { onSearchChange, handleSubmitCriteria } = props
  return (
    <Layout.Root>
      <FormattedMessage
        id='search-bar'
        defaultMessage='Search Keywords, Program name, DJ …'
      >
        {msg => (
          <Layout.Input
            name='q'
            placeholder={msg}
            onChange={onSearchChange}
          />
        )}
      </FormattedMessage>
      <Layout.Button
        onClick={() => handleSubmitCriteria()}
      >
        <Icon
          fitted
          name='search'
        />
      </Layout.Button>
    </Layout.Root>
  )
}

export default SearchBar
