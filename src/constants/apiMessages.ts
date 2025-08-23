export const API_MESSAGE_MAP: Record<string, string> = {
  // auth/login
  'Invalid credentials': 'Invalid username or password',
  'User inactive': 'User is inactive',
  'Account locked': 'Account locked',
  'Missing status code': 'Unexpected server error',
  'Validation failure': 'Required fields are missing',

  // auth/me, users/{id}
  'User not found': 'User not found',
  'Current user not found': 'Current user not found',

  // users
  'Username already exists': 'Username already exists',
  'Invalid status code': 'Invalid status code',
  'Invalid role code': 'Invalid role code',
  'Only admin can reset passwords': 'Only administrators can reset passwords',
  'Only admin can unlock accounts': 'Only administrators can unlock accounts',
  'User is not locked': 'User is not locked',
};
