export default {
    async registerUser(context, payload) {
      const userId = context.rootGetters.userId;
      const userData = {
        firstName: payload.firstname,
        lastName: payload.lastname,
        birthDate: payload.birthdate
      };
  
      const token = context.rootGetters.token;
  
      const response = await fetch(`https://social-app-70551-default-rtdb.firebaseio.com/users/${userId}.json?auth=` + token,
        {
          method: 'PUT',
          body: JSON.stringify(userData)
        });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to register user data!');
        throw error;
      }
  
      context.commit('registerUser', {
        ...userData,
        id: userId});
    }
  };
  