import React from 'react'
import styled from 'styled-components'
// import { Pagination, Item as SemanticItem } from 'semantic-ui-react'
// import shortid from 'shortid'
import get from 'lodash/get'
import { Pagination } from 'antd'

const CustomPagination = ({ ...newProps }) => {
  const handleOnPageChange = get(newProps, 'handleOnPageChange')
  const activePage = get(newProps, 'activePage')
  const totalItems = get(newProps, 'totalItems')
  const itemPerPage = get(newProps, 'itemPerPage')
  const totalPages = get(newProps, 'totalPages')
  // const color = get(newProps, 'color')
  return (
    <div>
      <StyleFullPagination totalPages={totalPages}>
        <Pagination
          current={activePage}
          onChange={handleOnPageChange}
          total={totalItems}
          pageSize={itemPerPage}
          defaultPageSize={totalItems}
        />
      </StyleFullPagination>
      <StylePagination totalPages={totalPages}>
        <Pagination
          simple
          current={activePage}
          onChange={handleOnPageChange}
          total={totalItems}
          pageSize={itemPerPage}
          defaultPageSize={totalItems}
        />
      </StylePagination>
    </div>
  )
}
export default CustomPagination

// This is full pagination
const StyleFullPagination = styled.div`
  display: ${p => (p.totalPages <= 1 ? 'none' : 'flex')};
  .ant-pagination-next .ant-pagination-item-link, .ant-pagination-prev .ant-pagination-item-link {
    border: 1px solid #E1E1E1;
    box-shadow: 0px 3px 6px #77777719;
}
.ant-pagination-next a, .ant-pagination-prev a {
    color: ${props => props.theme.colors.primary};
}
  .ant-pagination-item {
    border: 1px solid #E1E1E1;
    box-shadow: 0px 3px 6px #77777719;
}
.ant-pagination-item a {
    color: ${props => props.theme.colors.primary};
}
.ant-pagination-item-active {
    font-weight: 500;
    background: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary}; 
    box-shadow: 0px 3px 6px #77777719;
}
.ant-pagination-item-active a {
    color: ${props => props.theme.colors.white} !important;
}
@media (max-width: 586px) {
  display: none;
}
`

//This is minimal pagination
const StylePagination = styled.div`
  display: none;
@media (max-width: 586px) {
  display:  ${p => (p.totalPages <= 1 ? 'none' : 'flex')};
  margin-top: 10px;
  .ant-pagination, .ant-pagination ol, .ant-pagination ul {
    display: flex;
  }
.ant-pagination-simple .ant-pagination-next .ant-pagination-item-link, .ant-pagination-simple .ant-pagination-prev .ant-pagination-item-link {
    height: 30px;
}
.ant-pagination-simple .ant-pagination-next, .ant-pagination-simple .ant-pagination-prev {
    height: 30px;
    line-height: 30px;
}
.ant-pagination-simple .ant-pagination-simple-pager {
    display: flex;
    align-items: center;
    height: 30px;
}
.ant-pagination-simple .ant-pagination-simple-pager input:hover {
    border-color:  #d9d9d9;
}
.ant-pagination-simple .ant-pagination-simple-pager {
    margin-right: 18px;
}
.ant-pagination-slash {
    margin: 0 15px 0 15px;
}
}
`
