import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Table.css";

interface HpSpells {
  Name: string;
  Description: string;
}

const columnHelper = createColumnHelper<HpSpells>();

const columns = [
  columnHelper.accessor("Name", {
    cell: (info) => info.getValue(),
    header: () => <p>Name</p>,
  }),
  columnHelper.accessor("Description", {
    cell: (info) => info.getValue(),
    header: () => <p>Description</p>,
  }),
];

function Spells() {
  const [data, setData] = useState<HpSpells[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState<any>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://hp-api.onrender.com/api/spells")
      .then((response) => {
        const filteredData = response.data.map((post: any) => ({
          Name: post.name,
          Description: post.description,
        }));
        setData(filteredData);
        setLoading(false);
        console.log(filteredData);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div style={{ width: "550px" }} className="container">
        <h1 style={{ textAlign: "center", margin: "0" }}>
          Harry Potter Spells
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "20px",
          }}
          className="table-top"
        >
          <div>
            <label htmlFor="search">Search Spells: </label>
            <input
              type="search"
              name="search"
              value={globalFilter ?? ""}
              onChange={(filter) => setGlobalFilter(filter.target.value)}
              placeholder="Search Spells"
              className="input-search"
            />
          </div>
          <div>
            <span>Items per page: </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(size) => {
                table.setPageSize(Number(size.target.value));
              }}
              className="item-selector"
            >
              {[7, 15, 30].map((pgSize) => (
                <option
                  value={pgSize}
                  key={pgSize}
                  className="selector-options"
                >
                  {pgSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        <table className="table-container">
          {table.getHeaderGroups().map((headerObject) => (
            <tr key={headerObject.id}>
              {headerObject.headers.map((header) => (
                <th key={header.id}>
                  <div
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: "pointer" }}
                  >
                    {
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ) as React.ReactNode
                    }
                  </div>
                </th>
              ))}
            </tr>
          ))}
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cells) => (
                <td
                  key={cells.id}
                  style={{ padding: "10px" }}
                  align="left"
                  className="table-row"
                >
                  {
                    flexRender(
                      cells.column.columnDef.cell,
                      cells.getContext()
                    ) as React.ReactNode
                  }
                </td>
              ))}
            </tr>
          ))}
        </table>
        <div style={{ position: "relative", left: "17rem", margin: "10px" }}>
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="page-button"
          >
            --
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="page-button"
          >
            -
          </button>
          <span>
            <input
              type="number"
              min={1}
              max={table.getPageCount()}
              value={table.getState().pagination.pageIndex + 1}
              onChange={(value) => {
                const page = value.target.value
                  ? Number(value.target.value) - 1
                  : 0;
                table.setPageIndex(page);
              }}
              style={{ width: "40px", height: "25px", marginLeft: "10px" }}
            />
            <span>of {table.getPageCount()}</span>
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="page-button"
          >
            +
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="page-button"
          >
            ++
          </button>
        </div>
      </div>
    </>
  );
}

export default Spells;
