import React, { Fragment } from 'react'
import {
  Icon,
  Input,
  Dropdown,
} from 'semantic-ui-react'
import includes from 'lodash/includes'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Field, FormSection } from 'redux-form/immutable'
import { fromJS } from 'immutable'
import { FormattedMessage } from 'react-intl'

import FileUpload from '~/components/FileUpload'

import {
  Hashtag,
  SemanticInput,
  SemanticTextArea,
  DropdownWithLabel,
} from '~/components/ReduxForm'

import renderInput from '../Input'
import renderSelect from '../Select'

import countryData from '~/static/metadata/country.json'
import stateData from '~/static/metadata/state.json'
import banksData from '~/static/metadata/th/banks.json'
import DeleteModal from '~/hocs/Layouts/Modals/Success'
import LoadingPulse from '~/components/LoadingPulse'

const isAllowField = (roles = [], userRole = '') => (roles.findIndex(r => r.toLowerCase() === userRole.toLowerCase()) > -1)

const VENDOR_ROLES = {
  VA: ( <FormattedMessage
    id='admin'
    defaultMessage='admin'
  />),
  VO: (<FormattedMessage
    id='account-admin'
    defaultMessage='Account Admin'
  />),
  V: (<FormattedMessage
    id='user'
    defaultMessage='user'
  />),
}

// language=SCSS prefix=&{ suffix=}
const DropdownSpan = styled.span`
  color: ${props => (props.active ? 'grey' : 'black')};
  text-transform: capitalize;
`

const LoadingWrapper = styled.div`
  top: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const BlinkingText = styled.p`
  animation: blinker .4s linear infinite;

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`

const EmployeeLoading = ({ open }) => {
  if (open) {
    return (
      <LoadingWrapper>
        <CustomLoadingPulse
          isSmall
        />
        {/*<Icon*/}
        {/*  loading*/}
        {/*  name='compass outline'*/}
        {/*  size='big'*/}
        {/*/>*/}
        {/*<BlinkingText>*/}
        {/*  <FormattedMessage*/}
        {/*    id='loading'*/}
        {/*    defaultMessage='#Loading'*/}
        {/*  />*/}
        {/*</BlinkingText>*/}
      </LoadingWrapper>
    )
  }

  return null
}

const RoleDropdown = (props) => {
  const { text, onChange, role } = props

  return (
    <CustomDropdown text={text}>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => onChange('VA')}
        >
          <DropdownSpan
            active={(role === 'VA').toString()}
          >
            <FormattedMessage
              id='admin'
              defaultMessage='admin'
            />
          </DropdownSpan>
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => onChange('V')}
        >
          <DropdownSpan
            active={(role === 'V').toString()}
          >
            <FormattedMessage
              id='user'
              defaultMessage='user'
            />
          </DropdownSpan>
        </Dropdown.Item>
      </Dropdown.Menu>
    </CustomDropdown>
  )
}

RoleDropdown.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  role: PropTypes.string,
}

RoleDropdown.defaultProps = {
  text: '',
  role: '',
}

const ActionBar = (props) => {
  const {
    userRole,
    empEmail,
    empRole,
    handleChangeRole,
    handleRemoveEmployee,
  } = props

  if (userRole.toLowerCase() === 'v') {
    return (
      <Fragment>
        <StatusText
          right
          capitalize
        >
          {VENDOR_ROLES[empRole]}
        </StatusText>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <StyleDiv>
        <StatusText
          isStaff
          right
          capitalize
        >
          <RoleDropdown
            text={VENDOR_ROLES[empRole]}
            role={empRole}
            onChange={new_role => handleChangeRole(new_role, empEmail)}
          />
        </StatusText>

        <ButtonWrapper
          isStaff={empRole.toLowerCase() !== 'v'}
          right
          capitalize
        >
          <DeleteButton>
            <Icon
              onClick={() => handleRemoveEmployee('D', empEmail)}
              name='trash alternate outline'
            />
            <DeleteModal />
          </DeleteButton>
        </ButtonWrapper>
      </StyleDiv>
    </Fragment>
  )
}

ActionBar.propTypes = {
  userRole: PropTypes.string.isRequired,
  empEmail: PropTypes.string.isRequired,
  empRole: PropTypes.string.isRequired,
  handleChangeRole: PropTypes.func.isRequired,
}

const VendorForm = (props) => {
  const {
    company_info: { input: { value: company_info } },
    role: { input: { value: userRole } },
    members: { input: { value: members } },
    profile,
    kw,
    ad_license_loading,
    company_verify_loading,
    sale_kit_loading,
    other_loading,
    allowRoles,
    handleInputChange,
    handleModal,
    handleChangeRole,
    handleRemoveEmployee,
    handleUploadFile,
    handleDownload,
    loadings,
    lang,
  } = props
  const company_files = profile.get('company_files')
  return (
    <VendorFormWrapper>
      <CardInfo
        name='userAccountInfo'
        id='userAccountInfo'
      >
        <CardHeader>
          <CardHeaderLeft>
            <CardTitle>
              <FormattedMessage
                id='user-account-info'
                defaultMessage='User Account info'
              />
            </CardTitle>
          </CardHeaderLeft>
        </CardHeader>
        <CardBody>
          <FormattedMessage
            id='label-email'
            defaultMessage='Email'
          >
            {
              msg => (
                <Field
                  disabled
                  label={msg}
                  name='email'
                  placeholder='Email'
                  component={renderInput}
                />

              )
            }
          </FormattedMessage>

          <FormSection name='profile'>
            <FormattedMessage
              id='first-name'
              defaultMessage='First Name'
            >
              {
                msg => (
                  <Field
                    label={msg}
                    name='first_name'
                    placeholder={msg}
                    component={renderInput}
                  />
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='middle-name'
              defaultMessage='Middle Name'
            >
              {
                msg => (
                  <Field
                    label={msg}
                    name='middle_name'
                    placeholder={msg}
                    component={renderInput}
                  />
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='family-name'
              defaultMessage='Family Name'
            >
              {
                msg => (
                  <Field
                    label={msg}
                    name='last_name'
                    placeholder={msg}
                    component={renderInput}
                  />
                )
              }
            </FormattedMessage>
          </FormSection>
        </CardBody>
      </CardInfo>

      <FormSection name='company_info'>
        <CardInfo
          name='companyInfo'
          id='companyInfo'
        >
          <CardHeader>
            <CardHeaderLeft>
              <CardTitle>
                <FormattedMessage
                  id='company-info'
                  defaultMessage='Company Info'
                />
              </CardTitle>
            </CardHeaderLeft>
            <CardHeaderRight />
          </CardHeader>
          <CardBody>
            <FormattedMessage
              id='company-name'
              defaultMessage='Company Name'
            >
              {
                msg => (
                  <Field
                    disabled
                    label={msg}
                    name='name'
                    placeholder={msg}
                    component={renderInput}
                  />

                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='phone-number'
              defaultMessage='Phone Number'
            >
              {
                msg => (
                  <Field
                    disabled={!isAllowField(allowRoles, userRole)}
                    label={msg}
                    name='phone'
                    placeholder={msg}
                    component={renderInput}
                  />
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='Address'
              defaultMessage='Address'
            >
              {
                msg => (
                  <Field
                    disabled={!isAllowField(allowRoles, userRole)}
                    label={msg}
                    placeholder={msg}
                    name='address'
                    component={renderInput}
                  />
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='Country'
              defaultMessage='Country'
            >
              {
                msg => (
                  <Field
                    disabled={!isAllowField(allowRoles, userRole)}
                    label={msg}
                    name='country'
                    component={renderSelect}
                  >
                    <option value=''>- {msg} -</option>
                    {
                      countryData.map(({ text, value }) => (
                        <option
                          value={value}
                          key={value}
                        >
                          {text}
                        </option>
                      ))
                    }
                  </Field>
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='state-province'
              defaultMessage='State/Province'
            >
              {
                msg => (
                  <Field
                    disabled={!isAllowField(allowRoles, userRole)}
                    label={msg}
                    name='state'
                    component={renderSelect}
                  >
                    <option value=''> - {msg} -</option>
                    {
                      stateData
                        .filter(({ country_id }) => country_id === company_info.get('country'))
                        .map(({ text, value }) => (
                          <option
                            value={value}
                            key={value}
                          >
                            {text}
                          </option>
                        ))
                    }
                  </Field>
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='city-district'
              defaultMessage='City/District'
            >
              {
                msg => (
                  <Field
                    disabled={!isAllowField(allowRoles, userRole)}
                    label={msg}
                    name='city'
                    placeholder={msg}
                    component={renderInput}
                  />
                )

              }
            </FormattedMessage>

            <FormattedMessage
              id='zip-postcode'
              defaultMessage='Zip/Post Code'
            >
              {
                msg => (
                  <Field
                    disabled={!isAllowField(allowRoles, userRole)}
                    label={msg}
                    name='zip_code'
                    placeholder={msg}
                    component={renderInput}
                  />
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='tax-id-citizen-id'
              defaultMessage='Tax ID/Citizen ID'
            >
              {
                msg => (
                  <Field
                    disabled={!isAllowField(allowRoles, userRole)}
                    label={msg}
                    name='tax_id'
                    placeholder={msg}
                    component={renderInput}
                  />
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='contact-name'
              defaultMessage='Contact name'
            >
              {
                msg => (
                  <Field
                    disabled={!isAllowField(allowRoles, userRole)}
                    label={msg}
                    placeholder={msg}
                    name='contact_name'
                    component={renderInput}
                  />
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='contact-mobile'
              defaultMessage='Contact mobile'
            >
              {
                msg => (
                  <Field
                    disabled={!isAllowField(allowRoles, userRole)}
                    label={msg}
                    placeholder={msg}
                    name='contact_mobile'
                    component={renderInput}
                  />
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='advertisement-license'
              defaultMessage='Advertisement license'
            >
              {
                msg => (
                  <FileUpload
                    name='ad_license'
                    title={msg}
                    open={ad_license_loading}
                    disabled={!isAllowField(allowRoles, userRole)}
                    onChange={handleUploadFile}
                    handleDownload={handleDownload}
                    files={company_files.get('ad_license')}
                  />
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='company-verification'
              defaultMessage='Company verification letter/ Citizen ID'
            >
              {
                msg => (
                  <FileUpload
                    name='company_verify'
                    title={msg}
                    open={company_verify_loading}
                    disabled={!isAllowField(allowRoles, userRole)}
                    onChange={handleUploadFile}
                    handleDownload={handleDownload}
                    files={company_files.get('company_verify')}
                  />
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='sale-kit'
              defaultMessage='Sale kit file'
            >
              {
                msg => (
                  <FileUpload
                    name='sale_kit'
                    title={msg}
                    open={sale_kit_loading}
                    disabled={!isAllowField(allowRoles, userRole)}
                    onChange={handleUploadFile}
                    handleDownload={handleDownload}
                    files={company_files.get('sale_kit')}
                  />
                )
              }
            </FormattedMessage>

            <FormattedMessage
              id='Other'
              defaultMessage='Other'
            >
              {
                msg => (
                  <FileUpload
                    name='other'
                    title={msg}
                    open={other_loading}
                    disabled={!isAllowField(allowRoles, userRole)}
                    onChange={handleUploadFile}
                    handleDownload={handleDownload}
                    files={company_files.get('other')}
                  />
                )
              }
            </FormattedMessage>
          </CardBody>
        </CardInfo>
      </FormSection>

      {
        userRole.toLowerCase() !== 'v' && (
          <FormSection name='company_info'>
            <FormSection name='bank_account'>
              <CardInfo
                name='bankInfo'
                id='bankInfo'
              >
                <CardHeader>
                  <CardHeaderLeft>
                    <CardTitle>
                      <FormattedMessage
                        id='bank-info'
                        defaultMessage='Bank info'
                      />
                    </CardTitle>
                  </CardHeaderLeft>

                  <CardHeaderRight />
                </CardHeader>
                <CardBody>
                  <FormattedMessage
                    id='bank-or-institution'
                    defaultMessage='Bank or Institution'
                  >
                    {
                      msg => (
                        <Field
                          label={msg}
                          name='bank'
                          component={renderSelect}
                        >

                          <option value=''> - {msg} -</option>
                          {
                            banksData
                              .map(({ label, value }) => (
                                <option
                                  value={value}
                                  key={value}
                                >
                                  {label[lang].toCapitalize()}
                                </option>
                              ))
                          }
                        </Field>
                      )
                    }
                  </FormattedMessage>

                  {
                    company_info.getIn(['bank_account', 'bank']) === 'other' && (
                      <FormattedMessage
                        id='bank-name'
                        defaultMessage='Bank Name'
                      >
                        {
                          msg => (
                            <Field
                              label={msg}
                              placeholder={msg}
                              name='bank_name'
                              component={renderInput}
                            />
                          )
                        }
                      </FormattedMessage>
                    )
                  }

                  <FormattedMessage
                    id='account-number'
                    defaultMessage='Account number'
                  >
                    {
                      msg => (
                        <Field
                          label={msg}
                          placeholder={msg}
                          name='account_number'
                          component={renderInput}
                        />
                      )
                    }
                  </FormattedMessage>

                  <FormattedMessage
                    id='account-name'
                    defaultMessage='Account name'
                  >
                    {
                      msg => (
                        <Field
                          label={msg}
                          placeholder={msg}
                          name='account_name'
                          component={renderInput}
                        />
                      )
                    }
                  </FormattedMessage>

                  <FormattedMessage
                    id='swift-code'
                    defaultMessage='SWIFT code'
                  >
                    {
                      msg => (
                        <Field
                          // isOptional
                          label={msg}
                          placeholder={msg}
                          name='swift_code'
                          component={renderInput}
                        />
                      )
                    }
                  </FormattedMessage>
                </CardBody>
              </CardInfo>
            </FormSection>
          </FormSection>
        )
      }

      <CardInfo
        name='employee'
        id='employee'
      >
        <CardHeader>
          <CardHeaderLeft>
            <CardTitle>
              <FormattedMessage
                id='Employee'
                defaultMessage='Employee'
              />
            </CardTitle>
          </CardHeaderLeft>
          <CardHeaderRight>
            <FormattedMessage
              id='filter-item'
              defaultMessage='Filter item…'
            >
              {
                msg => (
                  <InputStyled
                    value={kw}
                    name='kw'
                    icon='search'
                    type='search'
                    placeholder={msg}
                    onChange={handleInputChange}
                  />
                )
              }
            </FormattedMessage>
            <AddButton onClick={() => handleModal()}>
              <Icon name='plus' />
            </AddButton>
          </CardHeaderRight>
        </CardHeader>

        <CardBody>
          <EmployeeContainer>
            <EmployeeHeader>
              <TableText>
                <FormattedMessage
                  id='label-email'
                  defaultMessage='Email'
                />
              </TableText>
              <TableText
                right
              >
                <FormattedMessage
                  id='Status'
                  defaultMessage='Status'
                />
              </TableText>

              {
                userRole.toLowerCase() !== 'v' && (
                  <EmptyTextWrapper />
                )
              }
            </EmployeeHeader>
            <EmployeeBody>
              {
                members
                  .filter(employee => (includes(employee.get('email'), kw)))
                  .map(employee => (
                    <EmployeeRow key={employee.get('email')}>
                      <EmployeeLoading
                        open={loadings.indexOf(employee.get('email')) > -1}
                      />
                      <EmployeeText>
                        {employee.get('email', '')}
                      </EmployeeText>

                      {
                        employee.get('role', '').toLowerCase() === 'vo' && (
                          <Fragment>
                            <StatusText
                              right
                              capitalize
                            >
                              {VENDOR_ROLES[employee.get('role', '')]}
                            </StatusText>

                            {
                              userRole.toLowerCase() !== 'v' && (
                                <EmptyTextWrapper />
                              )
                            }
                          </Fragment>
                        )
                      }

                      {
                        employee.get('role', '').toLowerCase() !== 'vo' && (
                          <ActionBar
                            userRole={userRole}
                            empEmail={employee.get('email', '')}
                            empRole={employee.get('role', '')}
                            handleChangeRole={handleChangeRole}
                            handleRemoveEmployee={handleRemoveEmployee}
                          />
                        )
                      }
                    </EmployeeRow>
                  ))
              }
            </EmployeeBody>
          </EmployeeContainer>
        </CardBody>
      </CardInfo>
    </VendorFormWrapper>
  )
}

VendorForm.propTypes = {
  profile: PropTypes.instanceOf(Map),
  company_info: PropTypes.instanceOf(Map).isRequired,
  role: PropTypes.instanceOf(Map).isRequired,
  members: PropTypes.instanceOf(Map).isRequired,
  kw: PropTypes.string.isRequired,
  ad_license_loading: PropTypes.bool.isRequired,
  company_verify_loading: PropTypes.bool.isRequired,
  sale_kit_loading: PropTypes.bool.isRequired,
  other_loading: PropTypes.bool.isRequired,
  allowRoles: PropTypes.instanceOf(Array).isRequired,
  handleModal: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleUploadFile: PropTypes.func.isRequired,
  handleChangeRole: PropTypes.func.isRequired,
  handleRemoveEmployee: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
}

VendorForm.defaultProps = {
  profile: fromJS({}),
}
export default VendorForm

// language=SCSS prefix=&{ suffix=}
const CardInfo = styled.section`
    background: ${props => props.theme.colors.white};
    position: relative;
    padding-bottom: 20px;
    margin-bottom: 25px;
    border: 1px solid #E1E1E1;
    border-radius: 4px;
    box-shadow: rgba(119, 119, 119, 0.1) 0 3px 6px;

`

// language=SCSS prefix=&{ suffix=}
const CardTitle = styled.span`
    font-size: 16px !important;
    font-weight: bold;
`

// language=SCSS prefix=&{ suffix=}
const CardBody = styled.section`
  display: flex;
  flex-direction: column;
`

// language=SCSS prefix=&{ suffix=}
const CardHeader = styled.header`
    display: flex;
    position: relative;
    height: 50px;

`

// language=SCSS prefix=&{ suffix=}
const CardHeaderLeft = styled.div`
    display: flex;
    flex: 1;
    background: #00A699;
    position: absolute;
    top: 0;
    left: 20px;
    padding: 10px 30px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    color: white;
    font-size: .9em;
`

// language=SCSS prefix=&{ suffix=}
const CardHeaderRight = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`

// language=SCSS prefix=&{ suffix=}
const AddButton = styled.div`
    color: #fff;
    display: flex;
    font-size: 1.5rem;
    background-color: #FF5A5F;
    padding: 0 10px 10px;
    align-items: center;
    margin-left: 15px;
    margin-right: 1.5rem;
    cursor: pointer;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    &:hover {
      opacity: 0.7;
    }

    i {
      margin: 0;
    }
`

// language=SCSS prefix=&{ suffix=}
const EmployeeContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px;
`

// language=SCSS prefix=&{ suffix=}
const EmployeeHeader = styled.div`
    display: flex;
    flex: 1;
    padding: 20px;
`

// language=SCSS prefix=&{ suffix=}
const EmployeeBody = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

// language=SCSS prefix=&{ suffix=}
const TableText = styled.span`
    flex: 1;
    font-size: 1rem;
    color: #808285;
    text-transform: uppercase;
    font-weight: 500;
    text-align: ${props => (props.right ? 'right' : 'left')};

`

// language=SCSS prefix=&{ suffix=}
const EmployeeRow = styled.div`
    position: relative;
    display: flex;
    box-shadow: 3px 3px 3px -3px #f2f2f2;
    margin: 5px 0px;
    border: 1px solid #E1E1E1;
    background-color: white;
    border-radius: 4px;
    padding: 20px;
    @media (max-width: 424px) {
    flex-direction: column;
  }
`

// language=SCSS prefix=&{ suffix=}
const EmployeeText = styled.span`
  //overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  //margin-right: 10px;
   color: ${props => (props.isStaff ? '#00A699' : 'black')};
  text-align: ${props => (props.right ? 'right' : 'left')};
  text-transform: ${props => (props.capitalize ? 'capitalize' : 'none')};
`
const StatusText = styled(EmployeeText)`
  flex: unset;
  margin-left: 10px;
`

const StyleDiv = styled.div`
  display: flex;
  @media (max-width: 424px) {
    justify-content: flex-end;
  }
`

const EmptyTextWrapper = styled.div`
  width: 32px;
`

const ButtonWrapper = styled(EmployeeText)`
  flex: unset;
  text-align: right;
  width: 32px;
  
`
// language=SCSS prefix=&{ suffix=}
const VendorFormWrapper = styled.div`
  //margin-top: 10px;
  margin: 10px auto;
  padding: 0 10px;
  //position: absolute;
  max-width: 600px;
  width: 100%;
  //top: 0;
  //left: 50%;
  //transform: translateX(-50%);
`

// language=SCSS prefix=&{ suffix=}
const InputStyled = styled(Input)`
  cursor: pointer;
  transition: 0.7s;
  
  input {
    background-color: #F5F6F7 !important;
    border-radius: 0 0 8px 8px !important;
    color: #808285 !important;
    background-image: linear-gradient(to right, #3D3E5E, #3D3E5E) !important;
    background-position: 13px calc(100% - 5px) !important;
    background-size: calc(100% - 23px) 1px !important;
    background-repeat: no-repeat !important;
    border: none !important;
    
    @media screen and (max-width: 500px) {
      width: 0 !important;
    }
  }

  input:focus {
    width: auto !important;
  }
`

// language=SCSS prefix=&{ suffix=}
const DeleteButton = styled.div`
    cursor: pointer;
    color: #333 !important;
`
const CustomDropdown = styled(Dropdown)`
  margin-left: 10px;
  
  i.dropdown.icon {
    margin-left: 4px !important;
  }
`
const CustomLoadingPulse = styled(LoadingPulse)`
`
