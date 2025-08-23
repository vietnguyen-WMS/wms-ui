const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API = {
  URL: API_URL,

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

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
