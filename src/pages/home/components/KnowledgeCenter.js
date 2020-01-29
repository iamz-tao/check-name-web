import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import shortid from 'shortid'
import Cookies from 'js-cookie'
import { fromJS } from 'immutable'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'antd'

import LoadingPulse from '~/components/LoadingPulse'
import { Link } from '~/routes'
import media from '~/styles/media'
import { homepageAction } from '~/modules/customer/actions'
import { Button } from '~/pages/blogs/components/Blog'


const Layout = {
  Root: styled.div`
    width: 100%;
    margin: 48px 0;

    ${media(425)`
      margin: 32px 0;
    `}
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
  `,
  Spacing: styled.span`
    height: 5px;
    margin: 0 20px;

    display: block;
    flex: 1;

    border-radius: 4px;
    background-color: #e1e1e1;

    ${media(425)`
      margin: 0 12px;
    `}

    ${media(320)`
      margin: 0 6px;
    `}
  `,
  Blogs: styled.div`
    margin-right: -16px;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    > * {
      margin: 16px 16px 0 0;
    }

    ${media(425)`
      margin-right: -12px;

      > * {
        margin: 12px 12px 0 0;
      }
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
  More: styled.div`
    color: #f37021;
    font-family: Sarabun;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;

    cursor: pointer;

    ${media(425)`
      font-size: 12px;
      line-height: 12px;
    `}
  `,
}

const Blog = {
  Root: styled.div`
    width: 360px;
    padding: 16px;

    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e1e1e1;
    box-shadow: 0 3px 6px rgba(119, 119, 119, 0.1);

    ${media(768)`
      width: 520px;
    `}
  `,
  Image: styled.img`
    width: 100%;
    height: 192px;
    margin-bottom: 12px;

    object-fit: cover;
    border-radius: inherit;

    ${media(425)`
      height: 120px;
    `}
  `,
  Title: styled.h3`
    margin-bottom: 12px;

    color: #231f20;
    font-family: Sarabun !important;
    font-weight: 600 !important;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: -1px;

    ${media(425)`
      margin-bottom: 6px;

      font-size: 16px;
      line-height: 16px;
    `}
  `,
  Description: styled.p`
    color: #808285;
    font-family: Sarabun;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;

    ${media(425)`
      font-size: 12px;
      line-height: 12px;
    `}
  `,
}

/**
 * @typedef {object} Props
 * @property {Array} blogs
 */

/** @param {Props} props */
export function KnowledgeCenter({ prefix = '' }) {
  const dispatch = useDispatch()
  const lang = useSelector(state => state.getIn(['locale', 'lang'], Cookies.get('lang', 'th')))
  const blogs = useSelector(state => state.getIn(['customer', 'homepage', 'blogs'], fromJS([])))
  const content = useSelector(state => state.getIn(['customer', 'homepage', 'blog', 'content', lang], ''))
  const [toggle, setToggle] = useState(false)

  const handleOnClick = ({ id }) => {
    dispatch(homepageAction.fetchBlog({ id }))
    setToggle(true)
  }

  const url = `${prefix}/blogs`
  return (
    <Fragment>
      <Modal
        closable
        visible={toggle}
        onOk={() => setToggle(false)}
        onCancel={() => setToggle(false)}
        footer={[
          <Button
            key='submit'
            type='primary'
            onClick={() => setToggle(false)}
          >
            Close
          </Button>,
        ]}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Modal>
      <Layout.Root>
        <Layout.Header>
          <Typography.Title>
            <FormattedMessage
              id='knowledge-center'
              defaultMessage='KNOWLEDGE CENTER'
            />
          </Typography.Title>
          <Layout.Spacing />
          <Link
            to={url}
            href={url}
          >
            <Typography.More>
              <FormattedMessage
                id='more'
                defaultMessage='MORE'
              />
            </Typography.More>
          </Link>
        </Layout.Header>
        <Layout.Blogs>
          {blogs === null && <LoadingPulse />}
          {blogs !== null && blogs.toJS()
            .map((blog, idx) => (
              <Blog.Root
                key={shortid.generate()}
                onClick={() => handleOnClick({ id: blog._id })}
              >
                <Blog.Image
                  alt={`image-${idx}`}
                  src={blog.image}
                />
                <Blog.Title>{blog.title[lang] || 'Title'}</Blog.Title>
                <Blog.Description>{blog.subtitle[lang] || 'Subtitle'}</Blog.Description>
              </Blog.Root>
            ))}
        </Layout.Blogs>
      </Layout.Root>
    </Fragment>
  )
}

export default KnowledgeCenter
