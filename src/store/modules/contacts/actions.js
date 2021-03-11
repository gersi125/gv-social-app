export default {
  async removeContact(context, payload) {
    const userId = payload.userId;
    const contactId = payload.contactId;
    const token = context.rootGetters.token;
      
    const response = await fetch(`https://social-app-70551-default-rtdb.firebaseio.com/users/${userId}/contacts/${contactId}.json?auth=` + token);
    let responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch a single contact.');
      throw error;
    }

    responseData = null;

    const delResponse = await fetch(`https://social-app-70551-default-rtdb.firebaseio.com/users/${userId}/contacts/${contactId}.json?auth=` + token,
        {
          method: 'PUT',
          body: JSON.stringify(responseData)
        });
    
    const delResponseData = await delResponse.json();
  
    if (!delResponse.ok) {
      const error = new Error(delResponseData.message || 'Failed to fetch your removal contact data.');
      throw error;
    }
    
    context.commit('removeContact', {
      ...responseData,
      id: contactId
    });
    context.commit('setFetchTimestamp');
  },
  async addContact(context, payload) {
    const userId = payload.userId;
    const contactId = payload.contactId;
    const token = context.rootGetters.token;
    const contactData = { contactId: contactId };
   
    const response = await fetch(`https://social-app-70551-default-rtdb.firebaseio.com/users/${userId}/contacts/${contactId}.json?auth=` + token,
        {
          method: 'PUT',
          body: JSON.stringify(contactData)
        });
  
    const responseData = await response.json();
  
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch your contact data.');
      throw error;
    }
  
    context.commit('addContact', {
      ...contactData,
      id: contactId
    });
  },
  async loadContacts(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
      
    const response = await fetch(`https://social-app-70551-default-rtdb.firebaseio.com/users/${userId}/contacts.json?auth=` + token);
    const responseData = await response.json();
  
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }
  
    const contacts = [];
  
    for (const key in responseData) {
      const contact = {
        id: key,
        contactId: responseData[key].contactId
      };
      contacts.push(contact);
    }
  
    context.commit('setContacts', contacts);
    context.commit('setFetchTimestamp');
  }
}
  