import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Table } from '@components/ui';
import type { Row, TableConfig, TableColumn } from '@components/ui/Table/Table.types';
import { useToastStore } from '@/stores';

const Home = () => {
  const { t } = useTranslation();
  const { showToast } = useToastStore();
  const counterRef = useRef(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowToast = () => {
    counterRef.current += 1;
    showToast({
      type: 'success',
      message: `Welcome Home ${counterRef.current}`,
    });
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Mock data for Users table
  const mockUsers: Row[] = [
    { id: 1, username: 'alice', status: 'active', role: 'admin', lastLoginAt: '2025-08-01T10:00:00Z', createdAt: '2025-06-01T10:00:00Z', updatedAt: '2025-07-01T10:00:00Z' },
    { id: 2, username: 'bob', status: 'inactive', role: 'operator', lastLoginAt: '2025-08-02T11:00:00Z', createdAt: '2025-06-02T11:00:00Z', updatedAt: '2025-07-02T11:00:00Z' },
    { id: 3, username: 'carol', status: 'active', role: 'supervisor', lastLoginAt: '2025-08-03T12:00:00Z', createdAt: '2025-06-03T12:00:00Z', updatedAt: '2025-07-03T12:00:00Z' },
    { id: 4, username: 'dave', status: 'locked', role: 'operator', lastLoginAt: '2025-08-04T13:00:00Z', createdAt: '2025-06-04T13:00:00Z', updatedAt: '2025-07-04T13:00:00Z' },
    { id: 5, username: 'eve', status: 'active', role: 'admin', lastLoginAt: '2025-08-05T14:00:00Z', createdAt: '2025-06-05T14:00:00Z', updatedAt: '2025-07-05T14:00:00Z' },
  ];

  const usersTableConfig: TableConfig = {
    title: 'Users',
    source: { api: 'localhost://8080/users', schema: 'ums', table: 'USERS' },
    columns: [
      { key: 'id', label: 'Id', searchable: true, filterable: true, type: 'text' as const },
      { key: 'username', label: 'Username', searchable: true, filterable: true, type: 'text' as const },
      { key: 'status', label: 'Status', searchable: true, filterable: true, type: 'text' as const },
      { key: 'role', label: 'Role', searchable: true, filterable: true, type: 'text' as const },
    ] as TableColumn[],
    pagination: {
      size: [50, 100, 150, 200],
      default: { page: 1, size: 100, total: 0 },
    },
  };

  const loadUsersMock = async ({
    page,
    size,
    search,
    filterKey,
    filterValue,
    searchableKeys,
  }: {
    page: number;
    size: number;
    search?: string;
    filterKey?: string;
    filterValue?: string;
    searchableKeys?: string[];
  }): Promise<{ items: Row[]; total: number }> => {
    let items = [...mockUsers];

    // Search across provided searchable keys
    if (search && (searchableKeys?.length ?? 0) > 0) {
      const q = search.toLowerCase();
      items = items.filter((row) =>
        searchableKeys!.some((k) => String(row[k] ?? '').toLowerCase().includes(q))
      );
    }

    // Column filter
    if (filterKey && filterValue) {
      const q = String(filterValue).toLowerCase();
      items = items.filter((row) => String(row[filterKey] ?? '').toLowerCase().includes(q));
    }

    const total = items.length;
    const start = (page - 1) * size;
    const end = start + size;
    const paged = items.slice(start, end);
    return { items: paged, total };
  };

  return (
    <>
      <h1>{t('home')}</h1>
      <p>{t('welcome')}</p>
      <div className="space-x-2">
        <Button onClick={handleShowToast}>Show Toast</Button>
        <Button onClick={handleOpenModal}>Show Modal</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is a modal body</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-6">
        <Table tableConfig={usersTableConfig} loadData={loadUsersMock} />
      </div>
    </>
  );
};

export default Home;
