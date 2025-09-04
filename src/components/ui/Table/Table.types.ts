import type { ReactNode, KeyboardEventHandler } from 'react';

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

export interface TableHeaderToolbarConfig {
  customRightToolbar?: () => ReactNode;
}

export interface TableConfig {
  title?: string;
  source: TableSourceConfig;
  // Accept either `columns` or legacy `column`
  columns?: TableColumn[];
  column?: TableColumn[];
  pagination: TablePaginationConfig;
  headerToolbar?: TableHeaderToolbarConfig;
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

export interface TableToolbarProps {
  title?: string;
  searchInput: string;
  setSearchInput: (v: string) => void;
  onSearchKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onRefresh: () => void;
  customRightToolbar?: () => ReactNode;
  filterableColumns: TableColumn[];
  filterKey: string;
  setFilterKey: (v: string) => void;
  filterValue: string;
  setFilterValue: (v: string) => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

export interface TableContentProps {
  loading: boolean;
  error: string | null;
  data: Row[];
  columns: TableColumn[];
}

export interface TablePaginationProps {
  page: number;
  size: number;
  total: number;
  pagination: TablePaginationConfig;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}
