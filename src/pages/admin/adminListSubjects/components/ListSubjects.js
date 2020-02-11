import React from 'react'
import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'
import {
  Menu,
} from 'antd'
import DeleteIcon from '~/components/DeleteIcon'

const SubjectsList = (props) => {
  const {
    subjects,
    filter,
    handleDeleteSubject,
    handleMenuClick,
  } = props

  return (
    <Column>
      <Wrapper>
        <Column>
          {subjects.map(s => (
            <ItemWrapper>
              <Row>
                <UserDetailGroup>
                  <ListDetail>
                    <ItemSpan>
                      {s.subject_code}
                    </ItemSpan>
                  </ListDetail>
                  <ListDetail style={{ flex: 2 }}>
                    <ItemSpan>
                      {s.subject_name}
                    </ItemSpan>
                  </ListDetail>
                  <DeleteIconWrapper>
                    <DeleteIcon
                      className='trash'
                      onClick={() => handleDeleteSubject(s.id)}
                    />
                  </DeleteIconWrapper>
                </UserDetailGroup>
              </Row>
            </ItemWrapper>
          ))}
        </Column>
      </Wrapper>
    </Column>
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
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
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
    display: flex;
    line-height: 40px;
    padding-left: 8px;
`

const ListDetail = styled(OtherWrapper)`
  display: flex;
  flex: 1;
  padding-left: 40px;
  text-align: start ;
`

const UserDetailGroup = styled.div`
  display: flex;
  flex: 4;
`

const DeleteIconWrapper = styled(OtherWrapper)`
  display: flex;
  flex: 1;
  padding-left: 40px;
  text-align: center;
  justify-content: center;
`