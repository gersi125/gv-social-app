export default {
  async contactUser(context, payload) {
    const userId = payload.userId;
    const contactId = context.rootGetters.userId;
    const token = context.rootGetters.token;   
    const newRequest = { recieverId: userId,
                         contactId: contactId,
                         message: payload.message }

    const response = await fetch(`https://social-app-70551-default-rtdb.firebaseio.com/users/${userId}/requests/${newRequest.contactId}.json?auth=` + token,
      {
        method: 'PUT',
        body: JSON.stringify(newRequest)        
      });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request.');
      throw error;
    }

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    
    const token = context.rootGetters.token;
    const userId = context.rootGetters.userId;

    const response = await fetch(`https://social-app-70551-default-rtdb.firebaseio.com/users/${userId}/requests.json?auth=` + token);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests.');
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        recieverId: responseData[key].recieverId,
        contactId: responseData[key].contactId,
        message: responseData[key].message
      };
      requests.push(request);  
    }

    context.commit('setRequests', requests);
    context.commit('setFetchTimestamp');
  },
  async removeRequest(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const contactId = payload.contactId;
    const newRequest = { contactId: contactId };
    const responseData =  {
      recieverId: null,
      contactId: null,
      message: null
    }

    const response = await fetch(`https://social-app-70551-default-rtdb.firebaseio.com/users/${userId}/requests/${newRequest.contactId}.json?auth=` + token,
      {
        method: 'PUT',
        body: JSON.stringify(responseData)
      });

    const delresponseData = await response.json();

    if (!response.ok) {
      const error = new Error(delresponseData.message || 'Failed to fetch requests.');
      throw error;
    }

    context.commit('removeRequest', {
      ...responseData,
      id: userId
    });
    context.commit('setFetchTimestamp');
  }
};


