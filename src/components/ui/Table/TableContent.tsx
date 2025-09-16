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
      className={clsx('table-content-block relative', loading && 'opacity-50')}
      aria-busy={loading}
      aria-live="polite"
    >
      <div className="absolute top-0 left-0 w-px h-full bg-gray-500"></div>
      <div className="absolute top-0 right-0 w-px h-full bg-gray-500"></div>
      <div className="absolute left-0 top-0 w-full h-px bg-gray-500"></div>
      <div className="absolute left-0 bottom-0 w-full h-px bg-gray-500"></div>

      {error && (
        <div className="p-3 text-sm text-red-600 border-b bg-red-50">
          {error.message}
        </div>
      )}

      {data.length === 0 ? (
        <div className="py-16 text-center text-gray-500">No data available</div>
      ) : (
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                {columns.map((col) => {
                  const isSorted = sortKey === col.key;
                  let icon = 'fa-up-down';
                  if (isSorted && sortDirection === 'asc') {
                    icon = 'fa-arrow-up';
                  } else if (isSorted && sortDirection === 'desc') {
                    icon = 'fa-arrow-down';
                  }
                  return (
                    <th key={col.key} className="border border-gray-500">
                      <div className="flex justify-between p-2 space-x-2 font-semibold text-gray-700 text-center">
                        <button
                          type="button"
                          onClick={() => onSort(col.key)}
                          className="cursor-pointer"
                        >
                          <i className={`fa-solid ${icon} text-gray-400`} />
                        </button>
                        <span className="flex-1 text-center">{col.label}</span>
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
                      <td
                        key={col.key}
                        className="p-2 border border-gray-500 align-top"
                      >
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
