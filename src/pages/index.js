// import React from 'react'
// import PropTypes from 'prop-types'
// import {
//   Grid,
//   Icon,
//   Image,
// } from 'semantic-ui-react'
// import { compose } from 'redux'
// import styled from 'styled-components'
// import faker from 'faker'
// import truncate from 'lodash/truncate'

// import withIntl from '~/helpers/withIntl'
// import withLayout from '~/hocs/Layouts/withLayout'

// import Image1 from '~/static/images/carousel-1.jpg'

// import HomeSlider from './home/components/HomeSlider'
// import ServiceSection from './home/components/ServiceSection'

// const HomePage = () => {
//   const images = []
//   const imgId = [100, 200, 100, 100, 64]
//   for (let i = 0; i < imgId.length; i += 1) {
//     const ih = 200 + Math.floor(Math.random() * 10) * 15
//     images.push(`https://unsplash.it/250/${ih}?image=${imgId[i]}`)
//   }
//   return (
//     <HomeWrapper>
//       {/* <HomeSlider /> */}
//       {/* <ServiceSection /> */}
//     </HomeWrapper>
//   )
// }

// HomePage.propTypes = {}

// export default compose(
//   withIntl,
//   withLayout,
// )(HomePage)

// const HomeWrapper = styled.div`
//   display: block;
//   position: relative;
//   background: #F9F9F9;
//   padding-bottom: 50px;

//   .slick-dots{
//     bottom: 20px;
//   }

//   .slick-dots li button:before{
//     font-size: 15px;
//     color: #fff;
//   }

//   .slick-dots li.slick-active button:before{
//     opacity: 1;
//     color: #FF5E22;
//   }

//   .slick-next:before, .slick-prev:before{
//     color: #FF5E22;
//     font-size: 50px;
//   }

//   .slick-prev{
//     left: -30px;
//   }
// `