import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Cookie from 'js-cookie'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Modal, notification } from 'antd'
import { Icon } from 'semantic-ui-react'
import isNil from 'lodash/isNil'

import FilterAndCriteria from './components/FilterAndCriteria'
import BeaconsList from './components/BeaconsList'
import HeaderAdmin from '~/components/HeaderNavbar/Admin'

import NotFound from '~/components/Table/NotFound'
import LoadingPulse from '~/components/LoadingPulse'

import withLayout from '~/hocs/Layouts/withLayout'
import { beaconAction } from '~/modules/admin/actions'
import { beaconSelector } from '~/modules/admin/selectors'

const { confirm } = Modal

const TableHeader = ({ sortItem }) => (
  <Wrapper> 
    <Row>
      <UserDetailGroup>
        <ListHeader style={{ flex: 2 }}>
          <ItemHeader>
            UUID
          </ItemHeader>
          <Icon
            name='sort'
            style={{ paddingTop: '2px', cursor: 'pointer' }}
            onClick={() => sortItem('uuid')}
          />
        </ListHeader>
        <ListHeader>
          <ItemHeader>
            NAME
          </ItemHeader>
          <Icon
            name='sort'
            style={{ paddingTop: '2px', cursor: 'pointer' }}
            onClick={() => sortItem('name')}
          />
        </ListHeader>
        <ListHeader>
          <ItemHeader>
            STATUS
          </ItemHeader>
        </ListHeader>
      </UserDetailGroup>
      <DeleteWrapper />
    </Row>
  </Wrapper>
)

class ListBeacons extends Component {
  state = {
    allBeacon: null,
    beacon: '',
    loading: false,
    filter: {
      keyword: '',
    },
  }

  componentDidMount() {
    const token = Cookie.get('token')
    if (isNil(token)) {
      window.location.href = '/login'
    }
    const { getBeaconAll } = this.props
    getBeaconAll({})
  }

  handleInputChange = async ({ target }) => {
    await this.setState(state => ({
      ...state,
      filter: {
        ...state.filter,
        [target.name]: target.value,
      },
    }))
  }

  handleInput = (type, e) => {
    const { change } = this.props
    change(type, e)
  }

  handleResetFilter = () => {
    this.setState({
      filter: {
        keyword: '',
      },
      allBeacon: null,
    })
  }

  handleDeleteBeacon = (id) => {
    const { deleteBeacon } = this.props
    const success = 'success'
    confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure delete this year? You can\'t undo this action.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        deleteBeacon({ id })
        notification[success]({
          message: 'Delete Success!',
          description:
            'Action completed successfully.',
        })
      },
      onCancel() {
      },
    })
  }

  sortItem = (sort_by) => {
    const { beaconList } = this.props
    let dataSort = []
    if (sort_by === 'uuid') {
      dataSort = beaconList.sort((a, b) => (a.get(sort_by).toUpperCase() - b.get(sort_by).toUpperCase()))
    }
    if (sort_by === 'name') {
      dataSort = beaconList.sort((c, b) => c.get(sort_by).localeCompare(b.get(sort_by)))
    }
    this.setState({
      allBeacon: dataSort,
    })
  }

  render() {
    const {
      beaconList,
    } = this.props

    const {
      filter,
      allBeacon,
    } = this.state

    return (
      <PageWrapper>
        <HeaderAdmin />
        <RowContainer>
          <FilterWrapper>
            <FilterAndCriteria
              filter={filter}
              handleInputChange={this.handleInputChange}
              handleResetFilter={this.handleResetFilter}
            />
          </FilterWrapper>
          <RowContainer style={{ paddingTop: 0, marginBottom: '24px' }}>
            <ListCol
              style={{
                position: 'relative',
              }}
            >

              <Fragment>
                <Space />
                {
                    beaconList === null && (
                      <LoadingPulse />
                    )
                  }
                {
                    beaconList !== null && beaconList.size > 0 && (
                      <ListCol>
                        <TableHeader
                          sortItem={this.sortItem}
                        />
                        <ListCol>
                          <BeaconsList
                            beaconList={allBeacon === null ? beaconList : allBeacon}
                            filter={filter}
                            handleDeleteBeacon={this.handleDeleteBeacon}
                          />
                        </ListCol>
                      </ListCol>
                    )
                  }

                {
                    beaconList !== null && beaconList.size === 0 && (
                      <NotFound />
                    )
                  }
              </Fragment>
            </ListCol>
          </RowContainer>
        </RowContainer>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  beaconList: beaconSelector.getAllBeacon,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getBeaconAll: beaconAction.getBeaconAll,
  deleteBeacon: beaconAction.deleteBeacon,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
)(ListBeacons)

const PageWrapper = styled.div`
  font-family: Sarabun;
  position: relative;
  .ant-modal-confirm-body .ant-modal-confirm-title {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    font-family: kanit;
  }
`

const ItemHeader = styled.span`
    font-family: kanit;
    font-size: 18px;
    margin: 0;
    color: black;
    cursor: pointer;
`

const OtherWrapper = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
`

const RowContainer = styled.div`
  display: flex;
  padding: 0px 32px;
  flex: 1;
  justify-content: center;
  padding-left: 42px;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const ListCol = styled(Col)`
  flex: 1;
  .ui.dropdown > .text {
    color: #00a699;
  }
`

const FilterWrapper = styled(Col)`
  transition: 0.5s;
  margin-top: 50px;

  @media (max-width: 1024px) {
    position: absolute;
    transform: translate(-500%, 0px);
  }
`
const Space = styled.div`
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 24px 0px 0px 0px;
`

const ListHeader = styled(OtherWrapper)`
  flex: 1;
  display: inline-block;
  padding-left: 35px;
  text-align: left;
`
const UserDetailGroup = styled.div`
  display: flex;
  flex: 4;
  color: #929598;
  font-size: 16px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 76px;
  width: 100%;
`
const DeleteWrapper = styled.div`
  display: flex;
  width: 128px;
`
