export default {
    addContact(state, payload) {
      state.contacts.push(payload);
    },
    removeContact(state, payload) {
      const index = state.contacts.findIndex(contact => contact.id === payload)
      state.contacts.splice(index, 1);
    },
    setContacts(state, payload) {
      state.contacts = payload;
    },
    setFetchTimestamp(state) {
      state.lastFetch = new Date().getTime();
    }
  };