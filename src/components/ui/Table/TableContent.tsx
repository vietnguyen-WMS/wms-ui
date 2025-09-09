import React from 'react';
import clsx from 'clsx';
import type { TableContentProps } from './Table.types';

const TableContent: React.FC<TableContentProps> = ({
  loading,
  error,
  data,
  columns,
  sortKey,
  sortDirection,
  onSort,
}) => {
  return (
    <div
      className={clsx(
        'border rounded-md overflow-hidden',
        loading && 'opacity-70'
      )}
      aria-busy={loading}
      aria-live="polite"
    >
      {error && (
        <div className="p-3 text-sm text-red-600 border-b bg-red-50">
          {error.message}
        </div>
      )}

      {data.length === 0 ? (
        <div className="py-16 text-center text-gray-500">No data available</div>
      ) : (
        <div className="w-full overflow-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {columns.map((col) => {
                  const isSorted = sortKey === col.key;
                  let icon = 'fa-sort';
                  let color = 'text-gray-400';
                  if (isSorted && sortDirection === 'asc') {
                    icon = 'fa-sort-up';
                    color = 'text-green-500';
                  } else if (isSorted && sortDirection === 'desc') {
                    icon = 'fa-sort-down';
                    color = 'text-red-500';
                  }
                  return (
                    <th
                      key={col.key}
                      className="p-2 border font-semibold text-gray-700 text-center"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => onSort(col.key)}
                          className="flex items-center justify-center cursor-pointer"
                        >
                          <i className={`fa-solid ${icon} ${color}`} />
                        </button>
                        <span>{col.label}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className={clsx('odd:bg-white even:bg-gray-50')}>
                  {columns.map((col) => {
                    const value = (row as Record<string, unknown>)[col.key];
                    const toStringSafe = (v: unknown): string => {
                      if (v === null || v === undefined) return '';
                      if (
                        typeof v === 'string' ||
                        typeof v === 'number' ||
                        typeof v === 'boolean'
                      )
                        return String(v);
                      if (v instanceof Date) return v.toISOString();
                      if (typeof v === 'object') {
                        try {
                          return JSON.stringify(v);
                        } catch {
                          return '[Object]';
                        }
                      }
                      return String(v);
                    };
                    return (
                      <td key={col.key} className="p-2 border align-top">
                        {col.render
                          ? col.render(value, row)
                          : toStringSafe(value)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableContent;
