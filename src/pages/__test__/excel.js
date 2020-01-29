import React, { Fragment, useState } from 'react'
import * as XLSX from 'xlsx'

const aToOMapping = (headers, data) => headers
  .reduce((acc, header, i) => ({
    ...acc,
    [header]: data[i],
  }), {})

const aToO = (data) => {
  const headers = data.shift()

  return data.reduce((acc, curr) => {
    acc.push(aToOMapping(headers, curr))
    return acc
  }, [])
}

const oToAMapping = (headers, data) => headers
  .reduce((acc, header) => ([
    ...acc,
    data[header],
  ]), [])

const oToA = (data) => {
  if (data.length === 0) return []

  const headers = Object.keys(data[0])

  const d = data.reduce((acc, curr) => {
    const arr = oToAMapping(headers, curr)
    acc.push(arr)
    return acc
  }, [])

  return [headers, ...d]
}

const Excel = () => {
  const [dataExcel, setData] = useState([])

  const exportExcel = (e) => {
    e.preventDefault()
    const book = XLSX.utils.book_new()
    const sheet = XLSX.utils.aoa_to_sheet(oToA(dataExcel))

    XLSX.utils.book_append_sheet(book, sheet, 'untitle')
    XLSX.writeFile(book, 'download.xlsx')
  }

  const handleUpload = (e) => {
    e.preventDefault()

    const { files } = e.target
    const [f] = files
    const reader = new FileReader()

    reader.onload = function ({ target }) {
      const data = target.result

      const readedData = XLSX.read(data, { type: 'binary' })
      const wsname = readedData.SheetNames[0]
      const ws = readedData.Sheets[wsname]

      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 })
      setData(aToO(dataParse))
    }

    reader.readAsBinaryString(f)
  }

  return (
    <Fragment>
      <p> Upload Excel</p>
      <input
        type='file'
        onChange={handleUpload}
      />
      <button
        type='button'
        onClick={exportExcel}
      >
        export
      </button>
      <pre>
        {
          JSON.stringify(dataExcel, null, 2)
        }
      </pre>
    </Fragment>
  )
}

export default Excel
