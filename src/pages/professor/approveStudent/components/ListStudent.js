import React from 'react'
import styled from 'styled-components'
import { Table, Button } from 'antd'


const ListStudent = (props) => {
  const {
    students,
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
      title: 'STUDENT ID',
      dataIndex: 'student_id',
    },
    {
      title: 'NAME',
      dataIndex: 'name',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
    },
    {
      key: 'id',
      render: id => id,
    },
    {
      title: '',
      key: 'action',
      render: id => (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button style={{ backgroundColor: '#1AB433', border: '0.8px solid #1AB433' }} onClick={() => handleApprove(id)}>Approve</Button>
          <Button style={{ backgroundColor: '#CA5353', border: '0.8px solid #CA5353' }} onClick={() => handleReject(id)}>Reject</Button>
        </div>
      ),
    },
  ]
  
  const data = []
  students.toJS().map((s, index) => {
    data.push({
      key: index,
      student_id: s.std_id,
      name: `${s.firstname} ${s.lastname}`,
      status: s.status,
      id: s.std_id,
    })
  })

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
