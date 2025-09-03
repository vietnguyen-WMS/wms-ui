import React from 'react';
import { Button } from '@components/ui';
import type { TablePaginationConfig } from './Table.types';

interface TablePaginationProps {
  page: number;
  size: number;
  total: number;
  pagination: TablePaginationConfig;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  size,
  total,
  pagination,
  setPage,
  setSize,
}) => {
  const totalPages = Math.max(1, Math.ceil((total || 0) / size));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Rows per page</span>
        <select
          className="border rounded-md px-2 py-1 bg-white"
          value={size}
          onChange={(e) => {
            const next = Number(e.target.value);
            setSize(next);
            setPage(1);
          }}
        >
          {pagination.size.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => canPrev && setPage(Math.max(1, page - 1))}
            disabled={!canPrev}
          >
            Prev
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => canNext && setPage(Math.min(totalPages, page + 1))}
            disabled={!canNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
