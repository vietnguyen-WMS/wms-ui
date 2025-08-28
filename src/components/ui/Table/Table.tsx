import React, { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Button, Input } from '@components/ui';
import type { TableProps, TableFetchParams, TableColumn, Row } from './Table.types';

// Convert custom localhost:// port/path into http://localhost:port/path
const normalizeApi = (api: string): string => {
  if (api.startsWith('localhost://')) {
    const rest = api.replace('localhost://', '');
    const [port, ...pathParts] = rest.split('/');
    return `http://localhost:${port}/${pathParts.join('/')}`.replace(/\/$/, '');
  }
  return api;
};

const buildQuery = (params: Record<string, unknown>) => {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (typeof v === 'string') {
      if (v !== '') usp.set(k, v);
    } else if (typeof v === 'number' || typeof v === 'boolean') {
      usp.set(k, String(v));
    }
  });
  return usp.toString();
};

const defaultMapResponse = (raw: unknown): { items: Row[]; total: number } => {
  const data = raw as { items?: unknown[]; total?: number };
  const items = (data.items ?? []) as Row[];
  return { items, total: data.total ?? 0 };
};

const Table: React.FC<TableProps> = ({ tableConfig, mapResponse = defaultMapResponse, loadData }) => {
  const { title, source, pagination } = tableConfig;
  const columns: TableColumn[] = useMemo(
    () => tableConfig.columns ?? tableConfig.column ?? [],
    [tableConfig.columns, tableConfig.column]
  );
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(pagination.default.page);
  const [size, setSize] = useState<number>(pagination.default.size);
  const [total, setTotal] = useState<number>(pagination.default.total ?? 0);

  const [search, setSearch] = useState<string>('');
  const [filterKey, setFilterKey] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  const filterableColumns = useMemo(() => columns.filter(c => c.filterable), [columns]);
  const searchableColumns = useMemo(() => columns.filter(c => c.searchable), [columns]);

  const fetchData = useCallback(async () => {
    const apiUrl = normalizeApi(source.api);
    const params: TableFetchParams & { schema?: string; table?: string; searchable?: string } = {
      page,
      size,
      search: search || undefined,
      filterKey: filterKey || undefined,
      filterValue: filterValue || undefined,
      schema: source.schema,
      table: source.table,
      searchable: searchableColumns.length ? searchableColumns.map(c => c.key).join(',') : undefined,
    };

    setLoading(true);
    setError(null);
    try {
      if (loadData) {
        const result = await loadData({
          page,
          size,
          search: search || undefined,
          filterKey: filterKey || undefined,
          filterValue: filterValue || undefined,
          searchableKeys: searchableColumns.map(c => c.key),
        });
        setData(result.items);
        setTotal(result.total);
      } else {
        const url = `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}${buildQuery(params as unknown as Record<string, unknown>)}`;
        const res = await fetch(url, { credentials: 'include' });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json = await res.json();
        const mapped = mapResponse(json);
        setData(mapped.items);
        setTotal(mapped.total);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [filterKey, filterValue, page, search, size, source.api, source.schema, source.table, searchableColumns, mapResponse, loadData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = Math.max(1, Math.ceil((total || 0) / size));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const handleApplyFilter = () => {
    setPage(1);
    fetchData();
  };

  const handleClearFilter = () => {
    setFilterKey('');
    setFilterValue('');
    setPage(1);
  };

  const handleSearchKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setPage(1);
      fetchData();
    }
  };

  const refresh = () => {
    fetchData();
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between py-3 gap-3">
        <div className="flex items-center gap-2 flex-1">
          {title && <h2 className="text-lg font-semibold mr-3">{title}</h2>}
          <div className="max-w-sm w-full">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
          <Button variant="secondary" size="sm" onClick={refresh} className="ml-1">
            Refresh
          </Button>
        </div>

        {/* Right: Filter */}
        <div className="flex items-center gap-2">
          <select
            className="border rounded-md px-3 py-2 bg-white"
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
          >
            <option value="">Filter column...</option>
            {filterableColumns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>
          <Input
            placeholder="Value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            isDisabled={!filterKey}
          />
          <Button size="sm" onClick={handleApplyFilter} disabled={!filterKey}>
            Apply
          </Button>
          <Button size="sm" variant="secondary" onClick={handleClearFilter}>
            Clear
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className={clsx('border rounded-md overflow-hidden', loading && 'opacity-70')}
           aria-busy={loading}
           aria-live="polite">
        {error && (
          <div className="p-3 text-sm text-red-600 border-b bg-red-50">{error}</div>
        )}

        {data.length === 0 ? (
          <div className="py-16 text-center text-gray-500">No data available</div>
        ) : (
          <div className="w-full overflow-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {columns.map((col) => (
                    <th key={col.key} className="p-2 border text-left font-semibold text-gray-700">
                      {col.label}
                    </th>
                  ))}
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
                          {col.render ? col.render(value, row) : toStringSafe(value)}
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

      {/* Pagination */}
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
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => canPrev && setPage((p) => Math.max(1, p - 1))} disabled={!canPrev}>
              Prev
            </Button>
            <Button size="sm" variant="secondary" onClick={() => canNext && setPage((p) => Math.min(totalPages, p + 1))} disabled={!canNext}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
