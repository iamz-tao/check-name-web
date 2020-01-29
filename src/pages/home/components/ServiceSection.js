import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import shortid from 'shortid'

import media from '~/styles/media'

import { Link } from '~/routes'

import PlanIcon from '~/static/images/plan-icon.svg'
import BrowseBuyIcon from '~/static/images/browse-buy-icon.svg'
import SellAdsIcon from '~/static/images/sell-ads-icon.svg'

import { urlAdvertiserPrefix, urlVendorPrefix } from '~/config/constants'

const customerLinks = [
  {
    to: `${urlAdvertiserPrefix}/planner`,
    href: `${urlAdvertiserPrefix}/planner`,
    icon: <PlanIcon />,
    text: <FormattedMessage id='media-planner' defaultMessage='Media planner' />,
  },
  {
    to: `${urlAdvertiserPrefix}/products`,
    href: `${urlAdvertiserPrefix}/products`,
    icon: <BrowseBuyIcon />,
    text: <FormattedMessage id='browse-and-buy-ads' defaultMessage='Browse and buy ads' />,
  },
  {
    to: `${urlVendorPrefix}/`,
    href: `${urlVendorPrefix}/`,
    icon: <SellAdsIcon />,
    text: <FormattedMessage id='selling-ads' defaultMessage="I'm selling ads" />,
  },
]

const vendorLinks = [
  {
    to: `${urlVendorPrefix}/orders`,
    href: `${urlVendorPrefix}/orders`,
    icon: <PlanIcon />,
    text: <FormattedMessage id='Orders' defaultMessage='Orders' />,
  },
  {
    to: `${urlVendorPrefix}/products`,
    href: `${urlVendorPrefix}/products`,
    icon: <BrowseBuyIcon />,
    text: <FormattedMessage id='product' defaultMessage='Products' />,
  },
  {
    to: `${urlAdvertiserPrefix}/`,
    href: `${urlAdvertiserPrefix}/`,
    icon: <SellAdsIcon />,
    text: <FormattedMessage id='buying-ads' defaultMessage="I'm buying ads" />,
  },
]

const Layout = {
  Root: styled.div`
    padding: 60px;

    background-color: white;
    box-shadow: 0 3px 6px rgba(119, 119, 119, 0.1);

    ${media(1024)`
      padding: 48px;
    `}

    ${media(425)`
      padding: 24px;
    `}
  `,
  Action: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    row-gap: 16px;
    justify-items: center;

    ${media(768)`
      grid-template-columns: auto;
    `}
  `,
}

const Typography = {
  Heading: styled.h2`
    margin-bottom: 60px;

    display: flex;
    justify-content: center;

    color: #231f20;
    font-family: Kanit;
    font-weight: 500;
    font-size: 32px;
    line-height: 48px;
    text-align: center;

    ${media(1024)`
      margin-bottom: 32px;
    `}

    ${media(425)`
      margin-bottom: 16px;

      font-size: 20px;
      line-height: 30px;
    `}
  `,
}

const ActionButton = {
  Root: styled.div`
    width: 280px;
    height: 83px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #f37021;

    border-radius: 42px;
    border: 1px solid currentColor;

    cursor: pointer;

    ${media(1024)`
      height: 70px;
    `}

    ${media(425)`
      width: 240px;
      height: 60px;
    `}
  `,
  Icon: styled.div`
    margin-right: 24px;

    display: flex;

    svg {
      width: 50px;
      height: 50px;
    }

    svg path {
      fill: currentColor;
    }

    ${media(1024)`
      margin-right: 18px;
    `}

    ${media(425)`
      margin-right: 12px;

      svg {
        width: 40px;
        height: 40px;
      }
    `}
  `,
  Text: styled.div`
    width: 50%;

    color: inherit;
    font-family: Sarabun;
    font-weight: 500;
    font-size: 18px;
    text-align: center;

    ${media(768)`
      font-size: 16px;
    `}
  `,
}

export function ServiceSection({ page = 'C' }) {
  const links = page === 'C' ? customerLinks : vendorLinks
  return (
    <Layout.Root>
      <Typography.Heading>
        <FormattedMessage id='how' defaultMessage='How can we help you?' />
      </Typography.Heading>
      <Layout.Action>
        {links.map(l => (
          <Link to={l.to} href={l.href} key={shortid.generate()}>
            <ActionButton.Root>
              <ActionButton.Icon>{l.icon}</ActionButton.Icon>
              <ActionButton.Text>{l.text}</ActionButton.Text>
            </ActionButton.Root>
          </Link>
        ))}
      </Layout.Action>
    </Layout.Root>
  )
}

export default ServiceSection
