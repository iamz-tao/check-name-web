import React, { useEffect } from 'react'
import { compose } from 'redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

import withIntl from '~/helpers/withIntl'
import withLayout from '~/hocs/Layouts/withLayout'
import { urlVendorPrefix } from '~/config/constants'
import { homepageAction } from '~/modules/customer/actions'

import HomeSlider from './components/HomeSlider'
import ServiceSection from './components/ServiceSection'
import KnowledgeCenter from './components/KnowledgeCenter'
import SuccessStory from './components/SuccessStory'

const Layout = {
  Root: styled.div`
    padding-bottom: 50px;
    position: relative;
    background: #f9f9f9;
  `,
}

/**
 * @typedef {object} Props
 * @property {typeof homepageAction.fetchAssets} fetchAssets
 */

/** @extends {Component<Props>} */
const VendorHome = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(homepageAction.fetchAssets({ role: 'V' }))
  }, [])

  return (
    <Layout.Root>
      <HomeSlider />
      <ServiceSection
        page='V'
      />
      <Grid container>
        <KnowledgeCenter
          prefix={urlVendorPrefix}
        />
        <SuccessStory />
      </Grid>
    </Layout.Root>
  )
}

export default compose(
  withIntl,
  withLayout,
)(VendorHome)
