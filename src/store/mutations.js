export default {
  setFirstName(state, firstName) {
    let name = state.user.representative_name.split(' ');
    name[0] = firstName;
    state.user.representative_name = name.join(' ');
  },
  setLastName(state, lastName) {
    let name = state.user.representative_name.split(' ');
    name[1] = lastName;
    state.user.representative_name = name.join(' ');
  },
  setEmail(state, email) {
    state.user.representative_email = email;
  }
}