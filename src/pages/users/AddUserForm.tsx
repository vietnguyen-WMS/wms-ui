import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '@services/api';
import { API, messageCodeMap } from '@/constants';
import { Input, Button, Dropdown } from '@components/ui';

interface AddUserFormProps {
  onSuccess?: () => void;
}

const roles = [
  { value: 'admin', label: 'Administrator' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'operator', label: 'Operator' },
];

const AddUserForm: React.FC<AddUserFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    roleCode: '',
  });
  const [roleError, setRoleError] = useState('');
  const [apiMessage, setApiMessage] = useState('');

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
      onSuccess?.();
    } catch (error: unknown) {
      console.error(error);
      const code = (error as { response?: { data?: { code?: string } } })
        .response?.data?.code as string | undefined;
      const errorKey = code && messageCodeMap[code];
      setApiMessage(errorKey ? t(errorKey) : t('unknown_error'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border-b space-y-4">
      <div>
        <Input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          validationRules={[{ type: 'required', message: 'Username is required' }]}
        />
      </div>
      <div>
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
      <div>
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
        <p className="text-sm text-green-600">{apiMessage}</p>
      )}
      <Button type="submit" className="w-full">
        Add user
      </Button>
    </form>
  );
};

export default AddUserForm;
