import React from 'react';
import { Button, Input, Dropdown } from '@components/ui';
import type { TableToolbarProps } from './Table.types';

const TableToolbar: React.FC<TableToolbarProps> = ({
  title,
  searchInput,
  onSearchInputChange,
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
    <div className="flex items-center justify-between gap-3 p-3 bg-gray-50">
      <div className="flex items-center gap-2 flex-1">
        {title && <h2 className="text-lg font-semibold mr-3">{title}</h2>}
        <div className="max-w-sm w-full flex items-center">
          <div className="relative flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)}
              onKeyDown={onSearchKeyDown}
              className="pl-8 pr-7"
              wrapperClassName="flex-1"
            />
            {searchInput && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => onSearchInputChange('')}
              >
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          className="ml-2 flex items-center justify-center"
        >
          <i className="fa-solid fa-rotate-right" />
        </Button>
      </div>

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
                    onClick={onApplyFilter}
                    disabled={!filterKey}
                  >
                    Apply
                  </Button>
                </Dropdown.TriggerClose>
                <Dropdown.TriggerClose>
                  <Button size="sm" variant="secondary" onClick={onClearFilter}>
                    Clear
                  </Button>
                </Dropdown.TriggerClose>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default TableToolbar;
