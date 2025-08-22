export const API_URL = import.meta.env.VITE_API_URL;

export const GET_USERS = `${API_URL}/users`;
export const GET_USERS_BY_ID = (id: number | string) => `${API_URL}/users/${id}`;
export const ADD_USER = `${API_URL}/users`;
export const DELETE_USER = (id: number | string) => `${API_URL}/users/${id}`;
export const CHANGE_PASSWORD = (id: number | string) => `${API_URL}/users/${id}/password`;
export const UNLOCK_ACCOUNT = (id: number | string) =>
  `${API_URL}/users/${id}/reset-failed-attempts`;

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
