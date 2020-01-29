import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import shortid from 'shortid'
import BaseSlider from 'react-slick'

import { FormattedMessage } from 'react-intl'
import LoadingPulse from '~/components/LoadingPulse'
import useWindowWidth from '~/helpers/useWindowWidth'
import media from '~/styles/media'

import { fromJS } from 'immutable'

const sliderSettings = {
  arrows: false,
  autoplay: true,
  centerMode: true,
  centerPadding: '60px',
  className: 'center',
  infinite: true,
  slidesToShow: 1,
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

const Grid = {
  Root: styled.div`
    margin-top: 16px;

    display: grid;
    grid-template-rows: repeat(2, 128px);
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
  `,
  Main: styled.img`
    width: 100%;
    height: 100%;

    grid-area: 1 / 1 / span 2 / span 2;

    object-fit: cover;
    border-radius: 4px;
  `,
  Item: styled.img`
    width: 100%;
    height: 100%;

    object-fit: cover;
    border-radius: 4px;
  `,
  Slider: styled(BaseSlider)`
    margin: 0 -28px;
  `,
}

/**
 * @typedef {object} Props
 * @property {Array} stories
 */

/** @param {Props} props */
export function SuccessStory() {
  const width = useWindowWidth()
  const stories = useSelector(state => state.getIn(['customer', 'homepage', 'stories'], fromJS([])))

  // TODO: ให้แต่ละรูปมี space ระหว่างกันขณะที่เป็น mobile layout
  // TODO: ให้ slider กินความกว้างเต็ม viewport width ขณะที่เป็น mobile layout
  return (
    <Layout.Root>
      <Layout.Header>
        <Typography.Title>
          <FormattedMessage
            id='success-story'
            defaultMessage='SUCCESS STORY'
          />
        </Typography.Title>
        <Layout.Spacing />
      </Layout.Header>
      {stories === null && <LoadingPulse />}
      {
        stories !== null && (
          <Grid.Slider {...sliderSettings} slidesToShow={width <= 512 ? 1 : 2}>
            {stories.toJS()
              .map(s => (
                <Grid.Item
                  alt='sub_story'
                  src={s.image}
                  key={shortid.generate()}
                />
              ))}
          </Grid.Slider>
        )
      }

    </Layout.Root>
  )
}

export default SuccessStory
