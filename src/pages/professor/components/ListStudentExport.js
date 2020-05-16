import React from 'react'
import styled from 'styled-components'
import {
  Modal, Button,
} from 'antd'

import LoadingPulse from '~/components/LoadingPulse'

const ListStudentExport = ({
  handleClose, open, subject_code, handleExport, attendanceSheet,
}) => {
  if (!attendanceSheet) {
    return null
  }

  const attendanceSheets = attendanceSheet.toJS()
  const dataa = [
    {
      date: '07/05/2020 00:09',
      id: '5920501995',
      score: 0,
      student: 'boon boon',
    },
    {
      date: '07/05/2020 00:09',
      id: '5920501979',
      score: 1,
      student: 'thanakit haruehansapong',
    },
    {
      date: '06/05/2020 00:09',
      id: '5920501995',
      score: 0,
      student: 'boon boon',
    },
    {
      date: '06/05/2020 00:09',
      id: '5920501979',
      score: 1,
      student: 'thanakit haruehansapong',
    },
    {
      date: '06/05/2020 16:06',
      id: '5920501995',
      score: 0.5,
      student: 'boon boon',
    },
    {
      date: '06/05/2020 16:06',
      id: '5920501979',
      score: 1,
      student: 'thanakit haruehansapong',
    },
    {
      date: '06/05/2020 19:32',
      id: '5920501995',
      score: 1,
      student: 'boon boon',
    },
    {
      date: '06/05/2020 19:32',
      id: '5920501979',
      score: 1,
      student: 'thanakit haruehansapong',
    },
  ]
  const classOpen = []
  const idStd = []
  const xx = []
  attendanceSheets.class.map((a) => {
    classOpen.push({
      date: a.date,
      id: a.id,
    })
  })

  const dateOpen = classOpen.map(s => attendanceSheets.student.filter(ss => ss.date === s.date))
  // console.log('dateOpen',dateOpen[0])

  //remove id dup

  attendanceSheets.student.map((s) => {
    idStd.push(
      s.id,
    )
  })
  // id std
  const id = [...new Set(idStd)]

  const filteredArr = dateOpen.map(data => data.reduce((acc, current, index) => {
    const x = acc.find(item => item.id === current.id)
    if (!x) {
      return acc.concat([current])
    }
    const a = acc.find(item => item.id === x.id)
    Object.assign(a, { score: x.score += current.score })
    return acc
  }, []))

  const all = filteredArr.length > 0 ? filteredArr.reduce((acc, val) => [...acc, ...val]) : []

  const aaa = []
  if (all !== []) {
    all.map((al) => {
      all.map((a) => {
        if (classOpen.length > 1) {
          if (al.id === a.id && al.date !== a.date) {
            aaa.push({
              id: al.id,
              date: [
                al.date, a.date,
              ],
              name: al.student,
              score: [
                al.score, a.score,
              ],
              sum: (((al.score += a.score) / classOpen.length) * Math.trunc(attendanceSheets.total_mark)).toFixed(2),
            })
          }
        }
        if (classOpen.length === 1) {
          aaa.push({
            id: al.id,
            date: [
              al.date,
            ],
            name: al.student,
            score: [
              al.score,
            ],
            sum: ((al.score / classOpen.length) * Math.trunc(attendanceSheets.total_mark)).toFixed(2),
          })
        }
      })
    })
  }
  const data = aaa.reduce((acc, current, index) => {
    const x = acc.find(item => item.id === current.id)
    if (!x) {
      return acc.concat([current])
    }

    return acc
  }, [])

  const sortData = data.sort((a, b) => a.id - b.id)
  const section_name = attendanceSheets ? attendanceSheets.section_name : '-'
  const section = attendanceSheets ? attendanceSheets.section : '-'
  return (
    <PageWrapper>
      <Modal
        width={900}
        visible={open}
        title={(
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ItemHeaderModal>
              {' '}
                  SUBJECT NAME :
              {' '}
              {subject_code}
              {' '}
              {section_name}
            </ItemHeaderModal>
            <ItemHeaderModal>
                  SECTION NUMBER :
              {' '}
              {' '}
              {section}
            </ItemHeaderModal>
          </div>
                  )}
        onCancel={handleClose}
        footer={[
          <Button key='back' onClick={handleClose}>
              Close
          </Button>,
          <Button disabled={!attendanceSheets} style={{ borderColor: '#db2828', backgroundColor: '#db2828' }} key='submit' type='primary' onClick={() => handleExport(section_name, section)}>
          Export
          </Button>,
        ]}
      >

        <div>
          {/* {!attendanceSheet && (
            <LoadingPulse />
          )} */}

          {attendanceSheets && (
          <div>
            <div style={{ border: '1px solid #dedcdc', borderRadius: '14px', padding: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '150px', paddingLeft: '8px' }}>ID</div>
                <div style={{ flex: 0.4, minWidth: '210px' }}>NAME</div>

                {classOpen.map(t => (
                  <div style={{
                    width: '86px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  >
                    {t.date}
                  </div>
                ))}

                <div style={{
                  width: '86px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                >
TOTAL (
                  {attendanceSheets.total_mark}
)
                </div>
              </div>
              <br />
              {
            sortData.map((qq, i) => (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '150px', paddingLeft: '8px' }}>{qq.id}</div>
                <div style={{ flex: 0.4, minWidth: '210px' }}>{qq.name}</div>
                {qq.score.map(s => (
                  <div style={{
                    width: '86px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  >
                    {s}
                  </div>
                ))}


                <div style={{
                  width: '86px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                >
                  {qq.sum}

                </div>
              </div>
            ))
          }
            </div>
          </div>

          )}
        </div>

      </Modal>
    </PageWrapper>
  )
}

export default ListStudentExport

const PageWrapper = styled.div`
  font-family: Sarabun;
  position: relative;
  .ant-modal-confirm-body .ant-modal-confirm-title {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    font-family: kanit;
  }
  .ant-btn-primary {
    background-color: #db2828;
    border-color: #db2828;
}
`

const ItemHeaderModal = styled.span`
  font-family: kanit;
  font-size: 14px;
  margin: 0;
  color: #3d3d3d;
  font-weight: lighter;
`
