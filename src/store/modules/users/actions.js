export default {
    async loadContactUsers(context, payload) {
      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }

      const usrresponse = await fetch(`https://social-app-70551-default-rtdb.firebaseio.com/users.json`);
      const usrresponseData = await usrresponse.json();
  
      if (!usrresponse.ok) {
        const error = new Error(usrresponseData.message || 'Failed to fetch your detailed contact information!');
        throw error;
      }

      const userId = context.rootGetters.userId;
      const token = context.rootGetters.token;
      
      const contresponse = await fetch(`https://social-app-70551-default-rtdb.firebaseio.com/users/${userId}/contacts.json?auth=` + token);
      const contresponseData = await contresponse.json();
  
      if (!contresponse.ok) {
        const error = new Error(contresponseData.message || 'Failed to fetch contacts!');
        throw error;
      }

      const contacts = [];

      for(const usrkey in usrresponseData) {
        const user = {
          id :usrkey,
          firstName:   usrresponseData[usrkey].firstName,
          lastName:    usrresponseData[usrkey].lastName,
          email:       usrresponseData[usrkey].email,
          phoneNumber: usrresponseData[usrkey].phoneNumber,
          description: usrresponseData[usrkey].description
        }
        
        for(const contkey in contresponseData) {
        const contact = {
          id: contkey,
          contactId: contresponseData[contkey].contactId
        }   
          
          if(user.id === contact.id) {
            contacts.push(user);
          }

        }
      }
      context.commit('setContacts', contacts);
      context.commit('setFetchTimestamp');
    },
    async loadUsers(context, payload) {

      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }
  
      const response = await fetch(`https://social-app-70551-default-rtdb.firebaseio.com/users.json`);
      const responseData = await response.json();
  
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch your detailed information!');
        throw error;
      }
  
      const users = [];
      let singleUser = '';
  
      for (const key in responseData) {
        const user = {
          id: key,
          firstName:   responseData[key].firstName,
          lastName:    responseData[key].lastName,
          birthDate:   responseData[key].birthDate,
          email:       responseData[key].email,
          phoneNumber: responseData[key].phoneNumber,
          description: responseData[key].description
        };
        
        if(context.rootGetters.isAuthenticated) {
          if (user.id !== context.rootGetters.userId) {
            users.push(user);
          } else if(user.id === context.rootGetters.userId) {
            singleUser = user;
          }
        } else {
          users.push(user);
        } 
      }

      context.commit('setUsers', users);
      context.commit('setUser', singleUser);
      context.commit('setFetchTimestamp');
  },
  async completeUser(context, data) {
      const userId = context.rootGetters.userId;
      const userData = {
        firstName:   data.first,
        lastName:    data.last,
        birthDate:   data.birth,
        email:       data.email,
        phoneNumber: data.phone,
        description: data.desc
      };
  
      const token = context.rootGetters.token;
  
      const response = await fetch(`https://social-app-70551-default-rtdb.firebaseio.com/users/${userId}.json?auth=` + token,
        {
          method: 'PUT',
          body: JSON.stringify(userData)
        }
      );
  
      const responseData = await response.json();
  
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch your data.');
        throw error;
      }
  
      context.commit('completeUser', {
        ...userData,
        id: userId
      });
    }
  }
  