const validate = (values) => {
  const errors = {}
  if (values.get('role', '').toLowerCase() === 'c') {
    // if (!values.getIn(['profile', 'first_name'])) {
    //   set(errors, 'profile.first_name', requiredMsg)
    // }
    //
    // if (!values.getIn(['profile', 'last_name'])) {
    //   set(errors, 'profile.last_name', requiredMsg)
    // }
    //
    // if (!values.getIn(['profile', 'business_types', 0])) {
    //   set(errors, 'profile.business_types[0]', requiredMsg)
    // }
  }

  if (['v', 'va', 'vo'].some(r => r === values.get('role', '').toLowerCase())) {
    // if (!values.getIn(['profile', 'first_name'])) {
    //   set(errors, 'profile.first_name', requiredMsg)
    // }
    //
    // if (!values.getIn(['profile', 'last_name'])) {
    //   set(errors, 'profile.last_name', requiredMsg)
    // }
    //
    // if (!values.getIn(['company_info', 'phone'])) {
    //   set(errors, 'company_info.phone', requiredMsg)
    // }
    //
    // if (!values.getIn(['company_info', 'address'])) {
    //   set(errors, 'company_info.address', requiredMsg)
    // }
    //
    // if (!values.getIn(['company_info', 'city'])) {
    //   set(errors, 'company_info.city', requiredMsg)
    // }
    //
    // if (!values.getIn(['company_info', 'country'])) {
    //   set(errors, 'company_info.country', requiredMsg)
    // }
    //
    // if (!values.getIn(['company_info', 'state'])) {
    //   set(errors, 'company_info.state', requiredMsg)
    // }
    //
    // if (!values.getIn(['company_info', 'zip_code'])) {
    //   set(errors, 'company_info.zip_code', requiredMsg)
    // }
    //
    // if (!values.getIn(['company_info', 'tax_id'])) {
    //   set(errors, 'company_info.tax_id', requiredMsg)
    // }
    //
    // if (!values.getIn(['company_info', 'contact_name'])) {
    //   set(errors, 'company_info.contact_name', requiredMsg)
    // }
    //
    // if (!values.getIn(['company_info', 'contact_mobile'])) {
    //   set(errors, 'company_info.contact_mobile', requiredMsg)
    // }
    //
    // if (!values.getIn(['company_info', 'bank_account', 'bank'])) {
    //   set(errors, 'company_info.bank_account.bank', requiredMsg)
    // }
    //
    // if (values.getIn(['company_info', 'bank_account', 'bank']) === 'other'
    // && values.getIn(['company_info', 'bank_account', 'bank_name']) === ''
    // ) {
    //   set(errors, 'company_info.bank_account.bank_name', requiredMsg)
    // }
    //
    // if (!values.getIn(['company_info', 'bank_account', 'account_number'])) {
    //   set(errors, 'company_info.bank_account.account_number', requiredMsg)
    // }
    //
    // if (!values.getIn(['company_info', 'bank_account', 'account_name'])) {
    //   set(errors, 'company_info.bank_account.account_name', requiredMsg)
    // }
  }

  return errors
}
export default validate
