import React, { useEffect } from 'react'
import { compose } from 'redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button } from 'antd'
import withIntl from '~/helpers/withIntl'
import Checkmark from '~/static/images/checkmark.svg'
import Loading from '~/components/Loading'
import { Link } from '~/routes'

/**
 * @typedef {object} Props
 * @property {typeof homepageAction.fetchAssets} fetchAssets
 */

/** @extends {Component<Props>} */
// @ts-ignore
const Home = () =>
// const dispatch = useDispatch()

// useEffect(() => {
//   dispatch(homepageAction.fetchAssets({ role: 'C' }))
// }, [])

  (
    <AppWrapper>
      <HeaderCustom>
        <Checkmark />
        <Loading />
        <Tiltle>
        Class Attendance Tracker using Beacon Technology.
        </Tiltle>
        <BoxSpace />
        <span>
          <Link
            to='/login'
            href='/login'
          >
            <CustomButton size='large'>LOGIN</CustomButton>
          </Link>
          &nbsp; &nbsp;
          <Link
            to='/register'
            href='/register'
          >
          <CustomButton size='large'>SIGN UP</CustomButton>
          </Link>
        </span>
      </HeaderCustom>
    </AppWrapper>
  )


export default compose(
  withIntl,
  // withLayout,
)(Home)

const AppWrapper = styled.div`
  text-align: center;
  background-color: #000000;
  font-family: sans-serif;
  width: 100%;
  .ant-btn {
  color: #ffff;
  background-color: #0000;
  border-color: #ffff;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 28px;
  font-family: sans-serif;
  font-size: 18px;
  width: 120px;
  height: 48px;
}
.ant-btn:hover, .ant-btn:focus {
  color: #000;
  background-color: #fff;
  border-color: #000;
}
`
const Tiltle = styled.div`
  font-family: inherit;
  font-size: 36px;
  `
const BoxSpace = styled.div`
  height: 12px;
`
const CustomButton = styled(Button)`
.ant-btn {
  color: #ffff;
    background-color: #0000;
    border-color: #ffff;
}
`
const HeaderCustom = styled.div`
  background-color: #000000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
