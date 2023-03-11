import { ArchiveIcon } from '@heroicons/react/outline';
import * as React from 'react';

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
};

export const Table = <Entry extends { _id: string }>({ data, columns }: TableProps<Entry>) => {
  if (!data.length) {
    return (
      <div className="flex flex-col justify-center items-center h-80 text-gray-500 bg-white">
        <ArchiveIcon className="w-16 h-16" />
        <h4>No Entries Found</h4>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 sm:px-6 lg:px-8 min-w-full align-middle">
          <div className="overflow-hidden pb-5 sm:rounded-lg border-b border-gray-200 shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={column.title + index}
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((entry, entryIndex) => (
                  <tr
                    key={entry?._id || entryIndex}
                    className={entryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                  >
                    {columns.map(({ Cell, field, title }, columnIndex) => (
                      <td
                        key={title + columnIndex}
                        className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                      >
                        {Cell ? <Cell entry={entry} /> : entry[field]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
