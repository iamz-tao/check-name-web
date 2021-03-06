import React from 'react'
import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'
import Router from 'next/router'
import ListIcon from '~/components/ListIcon'
import NotFound from '~/components/Table/NotFound'


const TeachHistoryList = (props) => {
  const {
    history,
    filter,
    handleModal,
  } = props
  // console.log(students && students.toJS())
  const items = history.filter((s) => {
    if (filter.keyword === '') return s
    if (s.getIn(['date'])
    || s.getIn(['tiem'])) {
      return s
    }
  }).map(s => (
    <Column>
      <Wrapper>
        <Column>
          <ItemWrapper>
            <Row>
              {/* <a onClick={() => handleModal(s.get('id'))} style={{ width: '100%', color: '#575757' }}> */}
              <UserDetailGroup>
                <ListDetail style={{ minWidth: '82px', flex: 0 }}>
                  <ItemSpan>
                    {s.getIn(['number'])}
                  </ItemSpan>
                </ListDetail>
                <ListDetail>
                  <ItemSpan>
                    {s.getIn(['date'])}
                  </ItemSpan>
                </ListDetail>
                <ListDetail style={{ minWidth: '180px' }}>
                  {
                      s.get('time').includes('OPENING') ? (
                        <ItemSpan style={{color:'#1AB433'}}>
                          {s.get('time')}
                        </ItemSpan>
                      ) : (
                        <ItemSpan>
                          {s.get('time')}
                        </ItemSpan>
                      )
                    }

                </ListDetail>
                <DeleteIconWrapper>
                  <ListIcon
                    className='unordered list'
                    onClick={(e) => {
                      e.stopPropagation()
                      handleModal(s.get('class_id'))
                    }}
                  />
                      &nbsp; &nbsp;

                </DeleteIconWrapper>
              </UserDetailGroup>
              {/* </a> */}
            </Row>
          </ItemWrapper>
        </Column>
      </Wrapper>
    </Column>
  ))

  if (items.length === 0) {
    return <NotFound message={'There aren\'t teaching history in this section.'} />
  }
  return (
    items
  )
}

export default TeachHistoryList

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
