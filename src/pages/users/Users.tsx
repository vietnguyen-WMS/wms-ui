import { useEffect, useState } from 'react';
import api from '@services/api';
import { API } from '@/constants';
import { formatDate } from '@utils/date';
import { Input, Button, Dropdown } from '@components/ui';
import clsx from 'clsx';

interface User {
  id: number;
  username: string;
  status: string;
  role: string;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}

const roles = [
  { value: 'admin', label: 'Administrator' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'operator', label: 'Operator' },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    roleCode: '',
  });
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    roleCode?: string;
  }>({});
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const [apiMessage, setApiMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.get(API.GET_USERS);
      setUsers(res.data.items);
    } catch {
      setUsers([]);
    }
  };

  type FormFields = 'username' | 'password';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = e.target;
    const fieldName = name as FormFields;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handleRoleSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, roleCode: value }));
    if (errors.roleCode) {
      setErrors((prev) => ({ ...prev, roleCode: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.roleCode) newErrors.roleCode = 'Role is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    console.log(formData);
    try {
      const res = await api.post(API.ADD_USER, formData);
      setApiMessage(res.data.message || '');
      await fetchUsers();
      setHighlightedId(res.data.id);
      setTimeout(() => setHighlightedId(null), 300);
      setFormData({ username: '', password: '', roleCode: '' });
    } catch (error: unknown) {
      console.error(error);
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || 'Failed to add user';
      setApiMessage(message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-6 p-6 border rounded-md mb-6"
      >
        <div className="mb-4">
          <Input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            hasIconShowPassword
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <Dropdown>
            <Dropdown.Trigger>
              <div className="w-full border rounded-md px-3 py-2 text-left">
                {
                  formData.roleCode
                    ? roles.find((r) => r.value === formData.roleCode)?.label
                    : 'Select role'
                }
              </div>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              {roles.map((role) => (
                <Dropdown.Item
                  key={role.value}
                  onClick={() => handleRoleSelect(role.value)}
                >
                  {role.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {errors.roleCode && (
            <p className="mt-1 text-sm text-red-600">{errors.roleCode}</p>
          )}
        </div>
        {apiMessage && (
          <p className="mb-4 text-sm text-green-600">{apiMessage}</p>
        )}
        <Button type="submit" className="w-full">
          Add user
        </Button>
      </form>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Last Login</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={clsx(
                'odd:bg-white even:bg-gray-50 transition-colors duration-300',
                highlightedId === user.id && 'bg-green-300',
              )}
            >
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.status}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">{formatDate(user.lastLoginAt)}</td>
              <td className="p-2 border">{formatDate(user.createdAt)}</td>
              <td className="p-2 border">{formatDate(user.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
