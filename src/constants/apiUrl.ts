export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API = {
  URL: API_URL,

  // views
  VIEWS: `${API_URL}/views`,

  // auth
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',

  // users
  GET_USERS: '/users',
  GET_USERS_BY_ID: (id: number) => `/users/${id}`,
  ADD_USER: '/users',
  DELETE_USER: (id: number) => `/users/${id}`,
  CHANGE_PASSWORD: (id: number) => `/users/${id}/password`,
  UNLOCK_ACCOUNT: (id: number) => `/users/${id}/reset-failed-attempts`,
};
