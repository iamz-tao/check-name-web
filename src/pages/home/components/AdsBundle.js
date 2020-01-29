import React from 'react'
import styled from 'styled-components'
import {
  Grid,
  Header,
  Image as SemanticImage,
} from 'semantic-ui-react'
import Slider from 'react-slick'

import { FormattedMessage } from 'react-intl'
import Image1 from '~/static/images/carousel-1.jpg'

const settings2 = {
  className: 'slider variable-width',
  centerMode: true,
  infinite: true,
  centerPadding: 80,
  slidesToShow: 1,
  speed: 500,
  arrows: false,
  variableWidth: true,
}

const AdsBundle = class extends React.Component {
  state={}

  componentDidMount() {
    this.setState({ width: window.innerWidth })
  }

  render() {
    const { width } = this.state
    return (
      <Wrapper>
        <BrowseHeaderSection>
          <HeaderWrapper>
            <HeaderText>
              <FormattedMessage
                id='ads-bundle'
                defaultMessage='ADS BUNDLE'
              />
            </HeaderText>
            <Line />
          </HeaderWrapper>
        </BrowseHeaderSection>
        {width > 768 ? (
          <Col>
            <Row>
              <CardContentWrapper>
                <CardContent>
                  <Image src={Image1} />
                  <Title>Newspaper Bundle</Title>
                  <ul>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                  </ul>
                  <hr />
                  <RateCardPrice>
                    THB 35,000
                  </RateCardPrice>
                  <NetPrice>
                    THB 20,000
                  </NetPrice>
                </CardContent>
              </CardContentWrapper>
              <CardContentWrapper>
                <CardContent>
                  <Image src={Image1} />
                  <Title>Newspaper Bundle</Title>
                  <ul>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                  </ul>
                  <hr />
                  <RateCardPrice>
                    THB 35,000
                  </RateCardPrice>
                  <NetPrice>
                    THB 20,000
                  </NetPrice>
                </CardContent>
              </CardContentWrapper>
              <CardContentWrapper>
                <CardContent>
                  <Image src={Image1} />
                  <Title>Newspaper Bundle</Title>
                  <ul>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                  </ul>
                  <hr />
                  <RateCardPrice>
                    THB 35,000
                  </RateCardPrice>
                  <NetPrice>
                    THB 20,000
                  </NetPrice>
                </CardContent>
              </CardContentWrapper>
              <CardContentWrapper>
                <CardContent>
                  <Image src={Image1} />
                  <Title>Newspaper Bundle</Title>
                  <ul>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                  </ul>
                  <hr />
                  <RateCardPrice>
                    THB 35,000
                  </RateCardPrice>
                  <NetPrice>
                    THB 20,000
                  </NetPrice>
                </CardContent>
              </CardContentWrapper>
            </Row>
            <Row>
              <CardContentWrapper>
                <CardContent>
                  <Image src={Image1} />
                  <Title>Newspaper Bundle</Title>
                  <ul>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                  </ul>
                  <hr />
                  <RateCardPrice>
                    THB 35,000
                  </RateCardPrice>
                  <NetPrice>
                    THB 20,000
                  </NetPrice>
                </CardContent>
              </CardContentWrapper>
              <CardContentWrapper>
                <CardContent>
                  <Image src={Image1} />
                  <Title>Newspaper Bundle</Title>
                  <ul>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                  </ul>
                  <hr />
                  <RateCardPrice>
                    THB 35,000
                  </RateCardPrice>
                  <NetPrice>
                    THB 20,000
                  </NetPrice>
                </CardContent>
              </CardContentWrapper>
              <CardContentWrapper>
                <CardContent>
                  <Image src={Image1} />
                  <Title>Newspaper Bundle</Title>
                  <ul>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                  </ul>
                  <hr />
                  <RateCardPrice>
                    THB 35,000
                  </RateCardPrice>
                  <NetPrice>
                    THB 20,000
                  </NetPrice>
                </CardContent>
              </CardContentWrapper>
              <CardContentWrapper>
                <CardContent>
                  <Image src={Image1} />
                  <Title>Newspaper Bundle</Title>
                  <ul>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                    <li>Ads 1</li>
                  </ul>
                  <hr />
                  <RateCardPrice>
                    THB 35,000
                  </RateCardPrice>
                  <NetPrice>
                    THB 20,000
                  </NetPrice>
                </CardContent>
              </CardContentWrapper>
            </Row>
          </Col>
        ) : (
          <Grid.Row>
            <Grid.Column>
              <Slider {...settings2}>
                <CardContentWrapper>
                  <CardContent>
                    <Image src={Image1} />
                    <Title>Newspaper Bundle</Title>
                    <ul>
                      <li>Ads 1</li>
                      <li>Ads 1</li>
                      <li>Ads 1</li>
                      <li>Ads 1</li>
                    </ul>
                    <hr />
                    <RateCardPrice>
                      THB 35,000
                    </RateCardPrice>
                    <NetPrice>
                      THB 20,000
                    </NetPrice>
                  </CardContent>
                </CardContentWrapper>
                <CardContentWrapper>
                  <CardContent>
                    <Image src={Image1} />
                    <Title>Newspaper Bundle</Title>
                    <ul>
                      <li>Ads 1</li>
                      <li>Ads 1</li>
                      <li>Ads 1</li>
                      <li>Ads 1</li>
                    </ul>
                    <hr />
                    <RateCardPrice>
                      THB 35,000
                    </RateCardPrice>
                    <NetPrice>
                      THB 20,000
                    </NetPrice>
                  </CardContent>
                </CardContentWrapper>
                <CardContentWrapper>
                  <CardContent>
                    <Image src={Image1} />
                    <Title>Newspaper Bundle</Title>
                    <ul>
                      <li>Ads 1</li>
                      <li>Ads 1</li>
                      <li>Ads 1</li>
                      <li>Ads 1</li>
                    </ul>
                    <hr />
                    <RateCardPrice>
                      THB 35,000
                    </RateCardPrice>
                    <NetPrice>
                      THB 20,000
                    </NetPrice>
                  </CardContent>
                </CardContentWrapper>
              </Slider>
            </Grid.Column>
          </Grid.Row>
        )}
      </Wrapper>
    )
  }
}

export default AdsBundle

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const BrowseHeaderSection = styled(Grid.Row)`
  margin-top: 48px;
  margin-bottom: 16px;
  text-align: center;

  .ui.header{
    margin-bottom: 16px;
  }
`
const CardContentWrapper = styled.div`
  height: 100%;
  min-height: 150px;
  width: 260px;
  background: white;

  @media (max-width: 768px) {
    max-width: 150px;
    margin-right: 10px;
  }
`
const CardContent = styled.div`
  border: solid 1px #ddd;
  box-shadow: 0 3px 6px rgba(119, 119, 119, 0.1);
  border-radius: 4px;
  width: 260px;

  @media (max-width: 768px) {
    max-width: 150px;
  }

  h3 {
    font-family: Arial;
    font-size: 24px;
    font-weight: 700;
  }

  ul {
    min-height: fit-content;
  }

  li {
    font-size: 0.8em;
    font-family: Sarabun;
  }

  hr {
    color: #ddd;
    border-color: #ddd;
  }
`
const RateCardPrice = styled.div`
  margin: 4px;
  text-align: right;
  font-size: 1em;
  font-family: Sarabun;
  color: #484848;
  text-decoration: line-through;
`
const NetPrice = styled.div`
  margin: 4px;
  text-align: right;
  color: #F37021;
  font-family: Kanit;
  font-size: 1.5em;
  font-weight: 500;
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
const Title = styled(Header)`
  font-size: 1.25em !important;
  font-family: Sarabun !important;
  font-weight: 700 !important;
  margin: 5px !important;
`
const Image = styled(SemanticImage)`
  width: 284px;
  height: 165px;
  @media (max-width: 768px) {
    max-width: 150px;
    height: 75px;
  }
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 15px;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
