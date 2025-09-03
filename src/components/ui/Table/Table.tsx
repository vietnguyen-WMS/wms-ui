import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { TableProps, TableColumn, Row } from './Table.types';
import TableToolbar from './TableToolbar';
import TableContent from './TableContent';
import TablePagination from './TablePagination';

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
      <TableToolbar
        title={title}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearchKeyDown={handleSearchKeyDown}
        onRefresh={refresh}
        customRightToolbar={customRightToolbar}
        filterableColumns={filterableColumns}
        filterKey={filterKey}
        setFilterKey={setFilterKey}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        onApplyFilter={handleApplyFilter}
        onClearFilter={handleClearFilter}
      />
      <TableContent
        loading={loading}
        error={error}
        data={data}
        columns={columns}
      />
      <TablePagination
        page={page}
        size={size}
        total={total}
        pagination={pagination}
        setPage={setPage}
        setSize={setSize}
      />
    </div>
  );
};

export default Table;
