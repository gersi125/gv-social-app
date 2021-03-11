export default {
  completeUser(state, payload) {
    state.users.push(payload);
  },
  setUsers(state, payload) {
    state.users = payload;
  },
  setContacts(state, payload) {
    state.contacts = payload;
  },
  setUser(state, payload) {
    state.singleUser = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};