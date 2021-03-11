export default {
  requests(state) {
    return state.requests;
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  }
};