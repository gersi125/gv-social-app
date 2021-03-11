import { createRouter }     from 'vue-router';
import { createWebHistory } from 'vue-router';


import store from './store/index.js';

const ContactsList     = () => import('./pages/contacts/ContactsList.vue');
const UserProfile      = () => import('./pages/users/UserProfile.vue');
const UsersList        = () => import('./pages/users/UsersList.vue');
const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue');
const NotFound         = () => import('./pages/exceptions/NotFound.vue');
const UserAuth         = () => import('./pages/authentication/UserAuth.vue');

const routes = [
  { 
    path: '/', 
    redirect: '/users' 
  },
  { 
    path: '/users', 
    component: UsersList 
  },
  {
    path: '/profile', 
    component: UserProfile, 
    meta: { requiresAuth: true } 
  },
  {
    path: '/contacts',
    component: ContactsList,
    meta: { requiresAuth: true }
  },
  {
    path: '/requests', 
    component: RequestsReceived, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/auth', 
    component: UserAuth, 
    meta: { requiresUnauth: true } 
  },
  { 
    path: '/:notFound(.*)', 
    component: NotFound 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/users');
  } else {
    next();
  }
});

export default router;
