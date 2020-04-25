import React from 'react'
import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'
import Router from 'next/router'
import DeleteIcon from '~/components/DeleteIcon'
import ListIcon from '~/components/ListIcon'
import HistoryIcon from '~/components/HistoryIcon'
import NotFound from '~/components/Table/NotFound'
import {Tooltip} from 'antd'

const SubjectsList = (props) => {
  const {
    subjects,
    filter,
    handleDeleteSection,
    handleModal,
  } = props
  const items = subjects.filter((s) => {
    if (filter.keyword === '') return s
    if (s.getIn(['Subject', 'subject_name']).toLowerCase().includes(filter.keyword.toLowerCase())
    || s.getIn(['Subject', 'subject_code']).toLowerCase().includes(filter.keyword.toLowerCase())) {
      return s
    }
  }).map(s => (
    <Column>
      <Wrapper>
        <Column>
          {/* {subjects.map(s => ( */}
          <ItemWrapper>
            <Row>
              <a onClick={() => handleModal(s.get('id'))} style={{ width: '100%', color: '#575757' }}>
                <UserDetailGroup>
                  <ListDetail>
                    <ItemSpan>
                      {s.getIn(['Subject', 'subject_code'])}
                    </ItemSpan>
                  </ListDetail>
                  <ListDetail>
                    <ItemSpan>
                      {s.getIn(['Subject', 'subject_name'])}
                    </ItemSpan>
                  </ListDetail>
                  <ListDetail style={{ minWidth: '180px' }}>
                    <ItemSpan>
                      {s.get('section_number')}
                    </ItemSpan>
                  </ListDetail>
                  <DeleteIconWrapper>
                  <Tooltip placement="top" title={'Teach History'}>
                    <HistoryIcon
                      className='unordered list'
                      onClick={(e) => {
                        e.stopPropagation()
                        Router.replace(`/list-students-section/${s.get('id')}`)
                      }}
                    />
                    </Tooltip>
                    &nbsp; &nbsp;
                    <ListIcon
                      className='unordered list'
                      onClick={(e) => {
                        e.stopPropagation()
                        Router.replace(`/list-students-section/${s.get('id')}`)
                      }}
                    />
                      &nbsp; &nbsp;
                    <DeleteIcon
                      className='trash'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteSection(s.get('id'))
                      }}
                    />
                  </DeleteIconWrapper>
                </UserDetailGroup>
              </a>
            </Row>
          </ItemWrapper>
          {/* ))} */}
        </Column>
      </Wrapper>
    </Column>
  ))

  if (items.size === 0) {
    return <NotFound message={'There isn\'t a section in this semester.'} />
  }
  return (
    items
  )
}

export default SubjectsList

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  .ant-btn {
    width: 100px;
    height: 38px;
    font-family: kanit;
    font-size: 13px;
    margin-right: 23px;
    border-radius: 24px;
    background-color: #ffff !important;
    border: 1px solid #a2a2a2;
    box-sizing: border-box;
    color: #1AB433 !important;
    :hover {
      background-color: #ffff !important;
      color: #CA5353 !important;
    }
  }
`

const ItemWrapper = styled(Segment)`
  background-color: white;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 0px !important;
  padding: 0 !important;
  background: #FFFFFF !important;
  border: 1px solid #D0CDCD !important;
  box-sizing: border-box !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 18px !important;

  :hover {
    border: 1px solid #FFEEEE !important;
    background: #FFEEEE !important;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6px;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 76px;
  width: 100%;
`

const ItemSpan = styled.span`
    font-size: 14px;
    font-family: Sarabun;
    font-weight: 600;
    word-break: break-word;

    .b {
      font-weight: bold;
    }
`

const OtherWrapper = styled.div`
    width: 150px;
    display: flex;
    line-height: 40px;
    padding-left: 8px;
`

const ListDetail = styled(OtherWrapper)`
  flex: 1;
  display: inline-block;
  padding-left: 40px;
  text-align: left;
`

const UserDetailGroup = styled.div`
  display: flex;
  flex: 3;
  height: 100%;
  align-items: center;
`
const DeleteIconWrapper = styled(OtherWrapper)`
  display: flex;
  flex: 1;
  padding-left: 40px;
  text-align: center;
  justify-content: center;
  padding-top: 16px;
`
