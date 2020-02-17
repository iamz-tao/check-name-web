import React from 'react'
import styled from 'styled-components'
import { Table, Button } from 'antd'


const ListStudent = (props) => {
  const {
    subjects,
    // filter,
    // handleDeleteUser,
    hasSelected,
    start,
    loading,
    selectedRowKeys,
    rowSelection,
    handleReject,
    handleApprove,
    handleApproveSubjects,
  } = props

  const columns = [
    {
      title: 'SUBJECT CODE',
      dataIndex: 'student_id',
    },
    {
      title: 'SUBJECT NAME',
      dataIndex: 'name',
    },
    // {
    //   key: 'subject_id',
    //   // render: id => id,
    //   render: '215748548',
    // },
    // {
    //   title: '',
    //   key: 'action',
    //   render: '215748548' => (
    //     <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    //       <Button style={{ backgroundColor: '#1AB433', border: '0.8px solid #1AB433' }} onClick={() => handleApprove('215748548')}>Approve</Button>
    //       <Button style={{ backgroundColor: '#CA5353', border: '0.8px solid #CA5353' }} onClick={() => handleReject('215748548')}>Reject</Button>
    //     </div>
    //   ),
    // },
  ]

  const data = []
  // student.map((s, index) => {
    data.push({
      key: 1111,
      student_id: '215748548',
      name: 'xxxxxxx',
      status: 'PENDING',
    })
  // })
  // const types = filter.user_role.reduce((acc, curr) => [...acc, ...curr], [])

  // const keyword_lower = filter.keyword.toLowerCase()

  return (
    <Column>
      <Wrapper>
        <Column>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginBottom: 16, flex: 1 }}>
                <CustomClear type='dashed' onClick={start} disabled={!hasSelected} loading={loading}>
                  CLEAR
                </CustomClear>
                <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
              </div>
              <div style={{paddingRight: '16px'}}>
                <CustomApprove type='dashed' onClick={() => handleApproveSubjects('A')}>
                  APPROVE
                </CustomApprove>
                <CustomReject type='dashed' onClick={() => handleApproveSubjects('R')}>
                  REJECT
                </CustomReject>
              </div>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>
        </Column>
      </Wrapper>
    </Column>
  )
}

export default ListStudent

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  .ant-btn {
    width: 86px;
    height: 34px;
    font-size: 14px;
    margin-right: 23px;
    border-radius: 24px;
    box-sizing: border-box;
    color: #ffff !important;
    :hover {
      background-color: #ffff !important;
      color: rgba(0,0,0,.65) !important;
    }
  }

  .antd-table {
    font-family: kanit;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
  width: 100%;
`

const CustomClear = styled(Button)`
  background-color: #737373 !important;
  color: #8d9193;
  border: 0.8px solid #737373;
`

const CustomApprove = styled(Button)`
  background-color: #1AB433;
  border: 0.8px solid #1AB433;
`

const CustomReject = styled(Button)`
  background-color: #CA5353;
  border: 0.8px solid #CA5353;
`
