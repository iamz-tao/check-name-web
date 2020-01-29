import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import styled from 'styled-components'
import Slick from 'react-slick'
import { Image as BaseImage } from 'semantic-ui-react'
import shortid from 'shortid'

import { homepageSelector } from '~/modules/customer/selectors'

import media from '~/styles/media'

import carousel from '~/static/images/carousel-1.jpg'

const Slider = {
  Root: styled(Slick)`
    .slick-dots {
      bottom: 20px;

      ${media(768)`
        bottom: 14px;
      `}

      ${media(425)`
        bottom: 8px;
      `}
    }

    .slick-dots li {
      ${media(1024)`
        margin: 0 2px;
      `}

      ${media(425)`
        margin: 0;

        > button {
          padding: 3px;
        }
      `}
    }

    .slick-dots li button:before {
      font-size: 15px;
      color: #fff;

      ${media(425)`
        font-size: 12px;
      `}
    }

    .slick-dots li.slick-active button:before {
      opacity: 1;
      color: #ff5e22;
    }

    .slick-prev,
    .slick-next {
      z-index: 3;

      ${media(425)`
        display: none !important;
      `}
    }

    .slick-prev {
      left: 27px;

      ${media(768)`
        left: 18px;
      `}
    }

    .slick-next {
      right: 57px;

      ${media(768)`
        right: 38px;
      `}
    }

    .slick-prev:before,
    .slick-next:before {
      color: #ff5e22;
      font-size: 50px;

      ${media(768)`
        font-size: 40px;
      `}
    }
  `,
  Item: styled.div`
    position: relative;
  `,
  Image: styled(BaseImage)`
    width: 100%;
    height: 410px;
    object-fit: cover;
    filter: brightness(70%);

    ${media(425)`
      height: 200px;
    `}
  `,
  Text: styled.div`
    width: 64%;

    position: absolute;
    top: 50%;
    left: 128px;
    transform: translateY(-50%);

    ${media(768)`
      left: 96px;
    `}

    ${media(425)`
      left: 32px;
    `}
  `,
}

const Typography = {
  Header: styled.h1`
    margin-bottom: 0;

    color: #fff;
    font-size: 72px;

    ${media(1024)`
      font-size: 64px;
    `}

    ${media(768)`
      font-size: 56px;
    `}

    ${media(425)`
      font-size: 32px;
      line-height: 32px;
    `}
  `,
  Detail: styled.p`
    margin-top: 32px;

    color: #fff;
    font-size: 16px;
    font-family: Sarabun;

    ${media(1024)`
      margin-top: 24px;
      font-size: 14px;
    `}

    ${media(425)`
      margin-top: 12px;

      font-size: 12px;
      line-height: 16px;
    `}
  `,
}

/**
 * @typedef {object} Props
 * @property {Array} banners
 */

/** @param {Props} props */
export function HomeSlider(props) {
  const { banners } = props
  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Slider.Root {...settings}>
      {banners.map((banner, idx) => (
        <Slider.Item key={shortid.generate()}>
          <Slider.Image alt={`image${idx}`} src={banner.image || carousel} />
          <Slider.Text>
            <Typography.Header>{banner.title.en || 'Title EN'}</Typography.Header>
            <Typography.Header>{banner.title.th || 'Title TH'}</Typography.Header>
            <Typography.Detail>
              {banner.subtitle.en || 'Subtitle EN'}
              <br />
              {banner.subtitle.th || 'Subtitle TH'}
            </Typography.Detail>
          </Slider.Text>
        </Slider.Item>
      ))}
    </Slider.Root>
  )
}

const mapStateToProps = createStructuredSelector({
  banners: homepageSelector.getBanners,
})

export default connect(mapStateToProps)(HomeSlider)
