import React from 'react';
import { Button, Input, Dropdown } from '@components/ui';
import type { TableToolbarProps } from './Table.types';

const TableToolbar: React.FC<TableToolbarProps> = ({
  title,
  searchInput,
  onSearchInputChange,
  onSearch,
  onClearSearch,
  onSearchKeyDown,
  onRefresh,
  customRightToolbar,
  filterableColumns,
  filterKey,
  setFilterKey,
  filterValue,
  setFilterValue,
  onApplyFilter,
  onClearFilter,
}) => {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-1">{title}</h2>
      <div className="flex justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="max-w-sm w-full">
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <div className="relative flex-1">
                <i className="fa-solid fa-magnifying-glass absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => onSearchInputChange(e.target.value)}
                  onKeyDown={onSearchKeyDown}
                  className="pl-3 pr-7 border-0 rounded-none"
                  wrapperClassName="flex-1"
                />
                {searchInput && (
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    onClick={onClearSearch}
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                )}
              </div>
              <Button
                className="rounded-none border-l border-gray-300 flex items-center justify-center"
                onClick={onSearch}
              >
                <i className="fa-solid fa-magnifying-glass" />
              </Button>
            </div>
          </div>
          <Button onClick={onRefresh} variant="secondary">
            <i className="fa-solid fa-arrows-rotate"></i>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {customRightToolbar && customRightToolbar()}
          <Dropdown>
            <Dropdown.Trigger>
              <div className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded cursor-pointer">
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
                      onClick={onApplyFilter}
                      disabled={!filterKey}
                    >
                      Apply
                    </Button>
                  </Dropdown.TriggerClose>
                  <Dropdown.TriggerClose>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={onClearFilter}
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
    </>
  );
};

export default TableToolbar;
