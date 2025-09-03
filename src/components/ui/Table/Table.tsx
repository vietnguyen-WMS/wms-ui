import React, { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Button, Input, Dropdown } from '@components/ui';
import type { TableProps, TableColumn, Row } from './Table.types';

// Convert custom localhost:// port/path into http://localhost:port/path
const normalizeApi = (api: string): string => {
  if (api.startsWith('localhost://')) {
    const rest = api.replace('localhost://', '');
    const [port, ...pathParts] = rest.split('/');
    return `http://localhost:${port}/${pathParts.join('/')}`.replace(/\/$/, '');
  }
  return api;
};

const defaultMapResponse = (raw: unknown): { items: Row[]; total: number } => {
  const data = raw as { items?: unknown[]; total?: number };
  const items = ((data.items ?? []) as Row[]).map((row) => {
    const flat: Row = {};
    Object.entries(row).forEach(([k, v]) => {
      if (
        v &&
        typeof v === 'object' &&
        'value' in (v as Record<string, unknown>)
      ) {
        flat[k] = (v as Record<string, unknown>).value;
      } else {
        flat[k] = v;
      }
    });
    return flat;
  });
  return { items, total: data.total ?? 0 };
};

const Table: React.FC<TableProps> = ({
  tableConfig,
  mapResponse = defaultMapResponse,
  loadData,
}) => {
  const { title, source, pagination, headerToolbar } = tableConfig;
  const customRightToolbar = headerToolbar?.customRightToolbar;
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

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterKey, setFilterKey] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [appliedFilterKey, setAppliedFilterKey] = useState<string>('');
  const [appliedFilterValue, setAppliedFilterValue] = useState<string>('');

  const filterableColumns = useMemo(
    () => columns.filter((c) => c.filterable),
    [columns]
  );
  const searchableColumns = useMemo(
    () => columns.filter((c) => c.searchable),
    [columns]
  );

  const fetchData = useCallback(async () => {
    const apiUrl = normalizeApi(source.api);

    setLoading(true);
    setError(null);
    try {
      if (loadData) {
        const result = await loadData({
          page,
          size,
          search: searchTerm || undefined,
          filterKey: appliedFilterKey || undefined,
          filterValue: appliedFilterValue || undefined,
          searchableKeys: searchableColumns.map((c) => c.key),
        });
        setData(result.items);
        setTotal(result.total);
      } else {
        const likeify = (v: string) => (v.includes('%') ? v : `%${v}%`);
        const filters: Array<{ field: string; op: string; value: string }> = [];
        if (searchTerm) {
          filters.push(
            ...searchableColumns.map((c) => ({
              field: c.key,
              op: 'LIKE',
              value: likeify(searchTerm),
            }))
          );
        }
        if (appliedFilterKey && appliedFilterValue) {
          filters.push({
            field: appliedFilterKey,
            op: 'LIKE',
            value: likeify(appliedFilterValue),
          });
        }

        const body: Record<string, unknown> = {
          tbl: source.table,
          schema: source.schema,
          page,
          page_size: size,
          default_sorts: source.defaultSorts,
          filters: filters.length ? filters : undefined,
        };

        const res = await fetch(apiUrl, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
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
  }, [
    appliedFilterKey,
    appliedFilterValue,
    page,
    searchTerm,
    size,
    source.api,
    source.schema,
    source.table,
    source.defaultSorts,
    searchableColumns,
    mapResponse,
    loadData,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = Math.max(1, Math.ceil((total || 0) / size));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setPage(1);
  };

  const handleApplyFilter = () => {
    setAppliedFilterKey(filterKey);
    setAppliedFilterValue(filterValue);
    setPage(1);
  };

  const handleClearFilter = () => {
    setFilterKey('');
    setFilterValue('');
    setAppliedFilterKey('');
    setAppliedFilterValue('');
    setPage(1);
  };

  const handleSearchKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key === 'Enter') {
      handleSearch();
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
          <div className="max-w-sm w-full flex items-center">
            <div className="relative flex-1">
              <Input
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="pr-7"
                wrapperClassName="flex-1"
              />
              {searchInput && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchInput('')}
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSearch}
              className="ml-2 flex items-center gap-1"
            >
              <i className="fa-solid fa-magnifying-glass" />
              Search
            </Button>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={refresh}
            className="ml-1"
          >
            Refresh
          </Button>
        </div>

        {/* Right: Custom Toolbar + Filter */}
        <div className="flex items-center gap-2">
          {customRightToolbar && customRightToolbar()}
          <Dropdown>
            <Dropdown.Trigger>
              <div className="px-2 py-1 bg-gray-500 hover:bg-gray-400 text-white rounded cursor-pointer">
                <i className="fa-solid fa-filter" />
              </div>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <div className="p-3 flex flex-col gap-2 min-w-[250px]">
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
                <div className="flex gap-2 justify-end">
                  <Dropdown.TriggerClose>
                    <Button
                      size="sm"
                      onClick={handleApplyFilter}
                      disabled={!filterKey}
                    >
                      Apply
                    </Button>
                  </Dropdown.TriggerClose>
                  <Dropdown.TriggerClose>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleClearFilter}
                    >
                      Clear
                    </Button>
                  </Dropdown.TriggerClose>
                </div>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Content */}
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
            {error}
          </div>
        )}

        {data.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No data available
          </div>
        ) : (
          <div className="w-full overflow-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="p-2 border text-left font-semibold text-gray-700"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr
                    key={idx}
                    className={clsx('odd:bg-white even:bg-gray-50')}
                  >
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
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => canPrev && setPage((p) => Math.max(1, p - 1))}
              disabled={!canPrev}
            >
              Prev
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                canNext && setPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={!canNext}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
