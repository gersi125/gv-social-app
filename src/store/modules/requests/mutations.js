export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  removeRequest(state, payload) {
    const index = state.requests.findIndex(request => request.id === payload)
    state.requests.splice(index, 1)
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};