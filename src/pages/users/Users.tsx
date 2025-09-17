import { useState } from 'react';
import { Button, Table, Drawer } from '@components/ui';
import AddUserForm from './AddUserForm';
import type { TableConfig } from '@components/ui/Table/Table.types';
import { API } from '@/constants';

const Users = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [tableKey, setTableKey] = useState(0);

  const handleAddUserSuccess = () => {
    setTableKey((k) => k + 1);
    setDrawerOpen(false);
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
      {
        key: 'id',
        label: 'ID',
        searchable: true,
        filterable: true,
        type: 'number',
      },
      {
        key: 'username',
        label: 'Username',
        searchable: true,
        filterable: true,
      },
      {
        key: 'display_name',
        label: 'Display Name',
        searchable: true,
        filterable: true,
      },
      { key: 'avatar_url', label: 'Avatar URL' },
      { key: 'bio', label: 'Bio', searchable: true, filterable: true },
      { key: 'address', label: 'Address', searchable: true, filterable: true },
    ],
    pagination: {
      sizes: [10, 25, 50, 100],
    },
    headerToolbar: {
      customRightToolbar: () => (
        <div className="right-toolbar">
          <Button onClick={() => setDrawerOpen(true)}>Add User</Button>
        </div>
      ),
    },
  };

  return (
    <>
      <Table key={tableKey} tableConfig={usersTableConfig} />
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Add User</Drawer.Title>
          <Drawer.CloseTrigger />
        </Drawer.Header>
        <Drawer.Body>
          <AddUserForm onSuccess={handleAddUserSuccess} />
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default Users;
