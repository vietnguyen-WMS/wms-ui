import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants';

interface User {
  id: number;
  username: string;
  status: string;
  role: string;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/users`);
        setUsers(res.data.items);
      } catch {
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  return (
    <>
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
            <tr key={user.id} className="odd:bg-white even:bg-gray-50">
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
