export default {
  setFirstName(state, firstName) {
    let name = state.user.representative_name.split(' ');
    name[0] = firstName;
    state.user.representative_name = name.join(' ');
  },
  setLastName(state, lastName) {
    const name = state.user.representative_name.split(' ');
    let newName = name[0];
    
    newName.push(lastName);
    state.user.representative_name = newName.join(' ');
  },
  setEmail(state, email) {
    state.user.representative_email = email;
  },
  setCompanyName(state, companyName) {
    state.user.company = companyName;
  },
  setCompanyAddress1(state, companyAddress1) {
    state.user.address1 = companyAddress1;
  },
  setCompanyAddress2(state, companyAddress2) {
    state.user.address2 = companyAddress2;
  }
}