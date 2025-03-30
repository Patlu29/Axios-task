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

interface HPcharacters {
  Name: string;
  Gender: string;
  DOB: string | number;
  ActorName: string;
  Image: string;
}
const columnHelper = createColumnHelper<HPcharacters>();

const columns = [
  columnHelper.accessor("Name", {
    cell: (info) => info.getValue(),
    header: () => <p>Name</p>,
  }),
  columnHelper.accessor("Gender", {
    cell: (info) => info.getValue(),
    header: () => <p>Gender</p>,
  }),
  columnHelper.accessor("DOB", {
    cell: (info) => info.getValue(),
    header: () => <p>Date of Birth</p>,
  }),
  columnHelper.accessor("ActorName", {
    cell: (info) => info.getValue(),
    header: () => <p>Actor Name</p>,
  }),
  columnHelper.accessor("Image", {
    cell: (info) => <img src={info.getValue()} alt="character" width="50" />,
    header: () => <p>Image</p>,
  }),
];

console.log(columns, "my columns");

function HPcharactersTable() {
  const [data, setData] = useState<HPcharacters[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState<any>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://hp-api.onrender.com/api/characters/students")
      .then((response) => {
        const filteredData = response.data
          .filter(
            (post: any) =>
              post.image !== "" &&
              post.yearOfBirth !== null &&
              post.dateOfBirth !== null
          )
          .map((post: any) => ({
            Name: post.name,
            Gender: post.gender,
            DOB: post.dateOfBirth,
            ActorName: post.actor,
            Image: post.image,
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
        pageSize: 5,
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

  console.log(table.getRowModel(), "table columns");

  return (
    <>
      <div style={{ width: "550px", margin: "0 50px 50px" }}>
        <h2 style={{ textAlign: "center" }}>Harry potter Characters</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "20px",
          }}
        >
          <div>
            <label htmlFor="search">Search Characters: </label>
            <input
              type="search"
              name="search"
              value={globalFilter ?? ""}
              onChange={(filter) => setGlobalFilter(filter.target.value)}
              placeholder="Search characters.."
            />
          </div>
          <div>
            <span>Items per page: </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(size) => {
                table.setPageSize(Number(size.target.value));
              }}
            >
              {[5, 10, 15, 20].map((pgSize) => (
                <option key={pgSize} value={pgSize}>
                  {pgSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        <table style={{ border: "1px solid black" }}>
          {table.getHeaderGroups().map((headerObject) => (
            <tr key={headerObject.id}>
              {headerObject.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ border: "1px solid black", padding: "10px" }}
                >
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
                  style={{ border: "1px solid black", padding: "10px" }}
                  align="left"
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
        <div style={{ position: "absolute", right: "33vw", margin: "10px" }}>
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            --
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
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
            />
            <span>of {table.getPageCount()}</span>
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            +
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            ++
          </button>
        </div>
      </div>
    </>
  );
}

export default HPcharactersTable;
