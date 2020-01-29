import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  Header,
  Image as SemanticImage,
} from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

import Loading from '~/components/LoadingPulse'
import { Link } from '~/routes'
import Image1 from '~/static/images/carousel-1.jpg'
import useWindowWidth from '~/helpers/useWindowWidth'
import { productTypes, urlAdvertiserPrefix } from '~/config/constants'
import { adsItemCustomerAction } from '~/modules/product/actions'
import media from '~/styles/media'
import { currency } from '~/helpers/utils'

const Price = ({ price }) => {
  const ratecard_price = price.get('ratecard_price')
  const gross_price = price.get('gross_price')

  if (ratecard_price > gross_price) {
    return (
      <Fragment>
        <RateCardPrice>
          <FormattedMessage
            id='card-THB'
            defaultMessage='THB'
            values={{
              price: currency(ratecard_price),
            }}
          />
        </RateCardPrice>
        <NetPrice>
          <FormattedMessage
            id='card-THB'
            defaultMessage='THB'
            values={{
              price: currency(gross_price),
            }}
          />
        </NetPrice>
      </Fragment>
    )
  }

  return (
    <NetPrice>
      <FormattedMessage
        id='card-THB'
        defaultMessage='THB'
        values={{
          price: currency(gross_price),
        }}
      />
    </NetPrice>
  )
}

const Layout = {
  Root: styled.div`
    width: 100%;
    margin: 48px 0;

    ${media(512)`
      margin: 32px 0;
    `}
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
  `,
  Spacing: styled.span`
    height: 5px;
    margin-left: 20px;

    display: block;
    flex: 1;

    border-radius: 4px;
    background-color: #e1e1e1;

    ${media(425)`
      margin-left: 12px;
    `}

    ${media(320)`
      margin-left: 6px;
    `}
  `,
}

const Typography = {
  Title: styled.h2`
    margin-bottom: 0;

    color: #231f20;
    font-family: Kanit;
    font-weight: 500;
    font-size: 32px;
    line-height: 48px;
    letter-spacing: -1px;

    ${media(425)`
      font-size: 20px;
      line-height: 30px;
    `}
  `,
}

const NotFoundWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 2em;
  }
  
  @media screen and (max-width: 1024px) {
    margin-top: 30px;
  }
`

const NotFound = () => (
  <NotFoundWrapper>
    <p>
      <FormattedMessage
        id='items-not-found'
        defaultMessage='Items Not found'
      />
    </p>
  </NotFoundWrapper>
)

const AdsItem = () => {
  const dispatch = useDispatch()
  const width = useWindowWidth()
  const productState = useSelector(state => state.getIn(['product', 'adsItemCustomer', 'records']))
  const [type, setType] = useState(productTypes[0].value)

  useEffect(() => {
    dispatch(adsItemCustomerAction.getAdsItemCustomer({
      item_per_page: 3,
      product_type: [type],
    }))
  }, [type])

  const isLoading = productState === null
  const url = `/products?type=${type}`
  const contentRender = () => (
    <Fragment>
      {
        productState.map(p => (
          <Link
            to={`${urlAdvertiserPrefix}/products/${p.get('_id', '')}`}
          >
            <AdsItemSegment>
              <Row>
                <Image src={p.getIn(['image_url', 0, 'url'], Image1)} />
                <Col
                  style={{
                    flex: 1,
                  }}
                >
                  <Title>{p.get('ads_item_name')}</Title>
                  <Detail>
                    {p.get('description')}
                  </Detail>
                  <Price
                    price={p.get('price')}
                  />
                </Col>
              </Row>
            </AdsItemSegment>
          </Link>
        ))
      }
    </Fragment>
  )

  return (
    <Wrapper>
      <Layout.Header>
        <Typography.Title>
          <FormattedMessage
            id='ads-items'
            defaultMessage='ADS ITEMS'
          />
        </Typography.Title>
        <Layout.Spacing />
      </Layout.Header>
      <ButtonRow>
        {
          productTypes.map(({ label, value }) => (
            <Col onClick={() => setType(value)}>
              <AdsItemButton
                active={value === type}
              >
                {label}
              </AdsItemButton>
            </Col>
          ))
        }
      </ButtonRow>


      <Fragment>
        {width > 1024 ? (
          <Row>
            <Col>
              <AdsItemBigSegment>
                <BigImage src={Image1} />
                <Title>
                  <FormattedMessage
                    id='newspaper-advertisement'
                    defaultMessage='Newspaper Advertisement'
                  />
                </Title>
                <Detail>
                  Description, Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserun
                </Detail>
                <Link
                  href={url}
                  to={url}
                >
                  <SeeAll>
                    <FormattedMessage
                      id='see-all-print-ads'
                      defaultMessage='See all print ads'
                    />
                  </SeeAll>
                </Link>
              </AdsItemBigSegment>
            </Col>
            <Col
              style={{
                flex: 1,
              }}
            >
              {isLoading && <Loading />}
              {!isLoading && productState.size > 0 && contentRender()}
              {!isLoading && productState.size === 0 && <NotFound />}
            </Col>
          </Row>
        ) : (
          <Col>
            <Row>
              <Col>
                <AdsItemSegment>
                  <Row>
                    <Image src={Image1} />
                    <Col>
                      <Title>
                        <FormattedMessage
                          id='newspaper-advertisement'
                          defaultMessage='Newspaper Advertisement'
                        />
                      </Title>
                      <Detail>
                        Description, Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserun
                      </Detail>
                      <Link
                        href={url}
                        to={url}
                      >
                        <SeeAll>
                          <FormattedMessage
                            id='see-all-print-ads'
                            defaultMessage='See all print ads'
                          />
                          {' '}
                          &gt;
                        </SeeAll>
                      </Link>
                    </Col>
                  </Row>
                </AdsItemSegment>
                {isLoading && <Loading />}
                {!isLoading && productState.size > 0 && contentRender()}
                {!isLoading && productState.size === 0 && <NotFound />}
              </Col>
            </Row>
          </Col>
        )}
      </Fragment>
    </Wrapper>
  )
}

export default AdsItem

const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        `
const BrowseHeaderSection = styled.div`
        display: flex;
        margin-top: 48px;
        margin-bottom: 16px;
        `
const AdsItemButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Sarabun;
  font-size: 1em;
  width: fit-content;
  height: 42px;
  min-width: 80px;
  border-radius: 4px;
  text-align: center;
  padding: 0px 10px 0px 10px;
  background: ${props => (props.active ? '#F37021' : 'white')};
  color: ${props => (props.active ? 'white' : 'black')};
  cursor: pointer;
`
const AdsItemBigSegment = styled.div`
  width: 384px;
  min-height: 530px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 15px 15px 0px 0px !important;
  border: 1px solid #DDDDDD;
  box-shadow: 0 3px 6px rgba(119, 119, 119, 0.1);
  border-radius: 4px;
  background: white;
`

const SeeAll = styled.span`
  text-align: right;
  font-size: 1em;
  font-weight: 500;
  color: #00A699;
  margin: 10px;
`
const AdsItemSegment = styled.div`
  cursor: pointer;
  margin: 15px 0px 0px 0px !important;
  padding: 5px !important;
  //height: 100%;
  min-height: 100px;
  border: 1px solid #DDDDDD;
  box-shadow: 0 3px 6px rgba(119, 119, 119, 0.1);
  border-radius: 4px;
  background: white;
`

const RateCardPrice = styled.div`
        text-align: right;
        text-decoration: line-through;
        font-size: 1em;
        color: #484848;
        font-family: Sarabun;
        margin: 0px 10px;

        @media (max-width: 768px) {
        font-size: 0.75em;
        }
        `

const NetPrice = styled.div`
        text-align: right;
        color: #F37021;
        font-weight: 500;
        font-size: 1.25em;
        margin: 0px 10px;

        @media (max-width: 768px) {
        font-size: 1em;
        }
        `
const HeaderWrapper = styled.div`
        display: flex;
        align-items: center;
        width: 100%;
        `
const HeaderText = styled(Header)`
        font-size: 2em;
        margin: 0px !important;

        @media (max-width: 768px) {
        font-size: 1.25em;
        }
        `
const Line = styled.div`
        background: #E1E1E1;
        flex: 1;
        height: 5px;
        border-radius: 4px;
        margin: 0px 10px 0px 10px;
        `
const ButtonRow = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 72px;
        background: white;
        box-shadow: 0 3px 6px rgba(119, 119, 119, 0.1);
        overflow-x: auto;
        padding: 10px;
        margin-bottom: 10px;
        `
const Row = styled.div`
        display: flex;
        height: 100%;
        width: 100%;
        `
const Col = styled.div`
        display: flex;
        flex-direction: column;

        @media (max-width: 768px) {
        width: 100%;
        }
        `
const BigImage = styled(SemanticImage)`
        width: 384px;
        height: 208px;
        `
const Image = styled(SemanticImage)`
  width: 291px;
  height: 165px;

  @media (max-width: 768px) {
    width: 150px;
    height: 100%;
  }
`
const Title = styled(Header)`
        margin: 10px !important;
        font-family: Sarabun !important;
        font-size: 1.25em !important;
        font-weight: 500px !important;

        @media (max-width: 768px) {
        font-size: 1em !important;
        }
        `
const Detail = styled.span`
  margin: 0px 10px;
  height: 100%;
  font-size: 1em !important;
  font-family: Sarabun !important;
  color: #808285 !important;
  
  @media (max-width: 768px) {
    font-size: 0.8em !important;
  }
  
  @media (max-width: 512px) {
    display: none;
  }
`
