export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API = {
  URL: API_URL,

  // views
  VIEWS: `${API_URL}/views`,

  // auth
  AUTH_LOGIN: `${API_URL}/auth/login`,
  AUTH_LOGOUT: `${API_URL}/auth/logout`,
  AUTH_ME: `${API_URL}/auth/me`,

  // users
  GET_USERS: `${API_URL}/users`,
  GET_USERS_BY_ID: (id: number) => `${API_URL}/users/${id}`,
  ADD_USER: `${API_URL}/users`,
  DELETE_USER: (id: number) => `${API_URL}/users/${id}`,
  CHANGE_PASSWORD: (id: number) => `${API_URL}/users/${id}/password`,
  UNLOCK_ACCOUNT: (id: number) =>
    `${API_URL}/users/${id}/reset-failed-attempts`,
};
