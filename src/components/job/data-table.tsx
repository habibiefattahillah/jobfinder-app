import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { useMemo, useEffect } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchInput);
    return () => debouncedSearch.cancel();
  }, [searchInput]);

  const filteredData = useMemo(() => {
    return data.filter((job: any) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType =
        jobType === "" || job.job_type.toLowerCase() === jobType.toLowerCase();
      const min = Number(minSalary) || 0;
      const max = Number(maxSalary) || Infinity;
      const matchesSalary = job.salary_min >= min && job.salary_max <= max;

      return matchesSearch && matchesType && matchesSalary;
    });
  }, [data, search, jobType, minSalary, maxSalary]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <Input
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">Semua</option>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <Input
          type="number"
          placeholder="Gaji Min"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Gaji Maks"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
        />
        <Button>
          <Link to="/dashboard/list-job-vacancy/form">Add Job</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
