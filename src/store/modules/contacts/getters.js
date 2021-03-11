export default {
    contacts(state) {
      return state.contacts;
    },
    hasContacts(state) {
      return state.contacts && state.contacts.length > 0;
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