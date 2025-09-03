import { useState } from 'react';
import api from '@services/api';
import { API, messageCodeMap } from '@/constants';
import { useTranslation } from 'react-i18next';
import { Input, Button, Dropdown, Table } from '@components/ui';
import type { TableConfig } from '@components/ui/Table/Table.types';

const roles = [
  { value: 'admin', label: 'Administrator' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'operator', label: 'Operator' },
];

const Users = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    roleCode: '',
  });
  const [roleError, setRoleError] = useState('');
  const [apiMessage, setApiMessage] = useState('');
  const [tableKey, setTableKey] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, roleCode: value }));
    if (roleError) {
      setRoleError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim() || !formData.roleCode) {
      if (!formData.roleCode) setRoleError('Role is required');
      return;
    }

    try {
      const res = await api.post(API.ADD_USER, formData);
      const successCode = res.data.code as string;
      const successKey = successCode && messageCodeMap[successCode];
      setApiMessage(successKey ? t(successKey) : '');
      setFormData({ username: '', password: '', roleCode: '' });
      setTableKey((k) => k + 1);
    } catch (error: unknown) {
      console.error(error);
      const code = (error as { response?: { data?: { code?: string } } })
        .response?.data?.code as string | undefined;
      const errorKey = code && messageCodeMap[code];
      setApiMessage(errorKey ? t(errorKey) : t('unknown_error'));
    }
  };

  const usersTableConfig: TableConfig = {
    title: 'Users',
    source: {
      api: API.VIEWS,
      schema: 'ums',
      table: 'USERS_VIEW',
      defaultSorts: [{ field: 'id', asc: true }],
    },
    columns: [
      { key: 'id', label: 'ID', searchable: true, filterable: true, type: 'number' },
      { key: 'username', label: 'Username', searchable: true, filterable: true },
      { key: 'display_name', label: 'Display Name', searchable: true, filterable: true },
      { key: 'avatar_url', label: 'Avatar URL' },
      { key: 'bio', label: 'Bio', searchable: true, filterable: true },
      { key: 'address', label: 'Address', searchable: true, filterable: true },
    ],
    pagination: {
      size: [50, 100, 150, 200],
      default: { page: 1, size: 50, total: 0 },
    },
  };

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
            validationRules={[{ type: 'required', message: 'Username is required' }]}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            hasIconShowPassword
            validationRules={[{ type: 'required', message: 'Password is required' }]}
          />
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
          {roleError && (
            <p className="mt-1 text-sm text-red-600">{roleError}</p>
          )}
        </div>
        {apiMessage && (
          <p className="mb-4 text-sm text-green-600">{apiMessage}</p>
        )}
        <Button type="submit" className="w-full">
          Add user
        </Button>
      </form>

      <Table key={tableKey} tableConfig={usersTableConfig} />
    </>
  );
};

export default Users;
