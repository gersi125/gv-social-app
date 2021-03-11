import { createStore } from 'vuex';

import usersModule    from './modules/users/index.js';
import contactsModule from './modules/contacts/index.js';
import registerModule from './modules/registration/index.js';
import requestsModule from './modules/requests/index.js';
import authModule     from './modules/authentication/index.js';

const store = createStore({
  modules: {
    users:    usersModule,
    contacts: contactsModule,
    register: registerModule,
    requests: requestsModule,
    auth:     authModule
  }
});

export default store;