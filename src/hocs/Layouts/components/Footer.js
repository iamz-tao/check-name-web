import React from 'react'
import { Header } from 'semantic-ui-react'
import styled from 'styled-components'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

const Footer = () => (
  <FooterWrapper>
    <Row>
      <Column>
        <Header>
          <FormattedMessage
            id='header-contact-us'
            defaultMessage='CONTACT US'
          />
        </Header>
        <br />
        <Link href='/privacy_policy'>
          <a href='/'>
            +44 345 678 903
          </a>
        </Link>
        <br />
        <br />
        <Link href='/privacy_policy'>
          <a href='/'>
            adobexd@mail.com
          </a>
        </Link>
        <br />
        <br />
        <Link href='/privacy_policy'>
          <a href='/'>
            <FormattedMessage
              id='find-store'
              defaultMessage='Find a Store'
            />
          </a>
        </Link>
      </Column>
      <Column>
        <Header>
          <FormattedMessage
            id='customer-service'
            defaultMessage='CUSTOMER SERVICE'
          />

        </Header>
        <br />
        <Link href='/privacy_policy'>
          <a href='/'>
            <FormattedMessage
              id='contact-us'
              defaultMessage='Contact Us'
            />

          </a>
        </Link>
        <br />
        <br />
        <Link href='/privacy_policy'>
          <a href='/'>
            <FormattedMessage
              id='ordering-payment'
              defaultMessage='Ordering & Payment'
            />
          </a>
        </Link>
        <br />
        <br />
        <Link href='/privacy_policy'>
          <a href='/'>
            <FormattedMessage
              id='returns'
              defaultMessage='Returns'
            />

          </a>
        </Link>
      </Column>
      <Column>
        <Header>
          <FormattedMessage
            id='information'
            defaultMessage='INFORMATION'
          />
        </Header>
        <br />
        <Link href='/privacy_policy'>
          <a href='/'>
            <FormattedMessage
              id='privacy-policy'
              defaultMessage='Privacy Policy'
            />
          </a>
        </Link>
      </Column>
    </Row>
    <CopyRight>
      <FormattedMessage
        id='copyright'
        defaultMessage='Copyright © 1996–2019 Sweetspot™. All rights reserved.'
      />
    </CopyRight>
  </FooterWrapper>
)

export default Footer

const FooterWrapper = styled.div`
  background-color: #fff;
  color: #333;
  padding: 2em;
  height: auto;
  border-top: solid 2px ${props => props.theme.colors.primary};
  font-family: Arial, Helvetica, sans-serif !important;

  a {
    color: #333;
  }

  .ui.header {
    color: #333;
    font-family: Arial, Helvetica, sans-serif !important;
  }
  
  @media screen and (max-width: 512px) {
    display: none;
  }
`

const Row = styled.div`
  display: flex;
  flex: 1;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const CopyRight = styled.p`
  margin: 30px 0;
  position: relative;
`
