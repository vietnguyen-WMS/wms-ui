import type { ReactNode } from 'react';

export type Row = Record<string, unknown>;

export type ColumnType = 'text' | 'number' | 'date' | 'custom';

export interface TableColumn {
  key: string;
  label: string;
  searchable?: boolean;
  filterable?: boolean;
  type?: ColumnType;
  render?: (value: unknown, row: Row) => ReactNode;
}

export interface TableSourceConfig {
  api: string; // e.g. 'localhost://8080/users' or full URL
  schema?: string;
  table?: string;
  defaultSorts?: { field: string; asc: boolean }[];
}

export interface TablePaginationConfig {
  size: number[];
  default: { page: number; size: number; total?: number };
}

export interface TableConfig {
  title?: string;
  source: TableSourceConfig;
  // Accept either `columns` or legacy `column`
  columns?: TableColumn[];
  column?: TableColumn[];
  pagination: TablePaginationConfig;
}

export interface TableFetchParams {
  page: number;
  size: number;
  search?: string;
  filterKey?: string;
  filterValue?: string;
}

export interface TableProps {
  tableConfig: TableConfig;
  /**
   * Optional hook to map API data into rows and total.
   * If not provided, the component expects `{ items: any[]; total: number }`.
   */
  mapResponse?: (raw: unknown) => { items: Row[]; total: number };
  /**
   * Optional loader to fully override fetching logic (useful for mocks).
   */
  loadData?: (
    params: TableFetchParams & { searchableKeys?: string[] }
  ) => Promise<{ items: Row[]; total: number }>;
}
