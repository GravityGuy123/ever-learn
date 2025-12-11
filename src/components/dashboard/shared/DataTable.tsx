"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
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
import { Search, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T extends object> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  searchKey?: keyof T;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
}

type SortDirection = "asc" | "desc" | null;

export function DataTable<T extends object>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  emptyMessage = "No data found",
  className,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const isRealSortable = (key: keyof T | string): key is keyof T =>
    columns.some((c) => c.key === key && c.sortable);

  const handleSort = (key: keyof T | string) => {
    if (!isRealSortable(key)) return;

    if (sortColumn === key) {
      if (sortDirection === "asc") setSortDirection("desc");
      else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      }
    } else {
      setSortColumn(key);
      setSortDirection("asc");
    }
  };

  const filteredData = useMemo(() => {
    let r = [...data];

    if (searchKey && searchQuery) {
      r = r.filter((item) =>
        String(item[searchKey] ?? "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (sortColumn && sortDirection) {
      r.sort((a, b) => {
        const av = a[sortColumn];
        const bv = b[sortColumn];

        if (typeof av === "number" && typeof bv === "number") {
          return sortDirection === "asc" ? av - bv : bv - av;
        }

        return sortDirection === "asc"
          ? String(av ?? "").localeCompare(String(bv ?? ""))
          : String(bv ?? "").localeCompare(String(av ?? ""));
      });
    }

    return r;
  }, [data, searchQuery, searchKey, sortColumn, sortDirection]);

  const getSortIcon = (key: keyof T | string) => {
    if (!isRealSortable(key)) return null;
    if (sortColumn !== key) return <ChevronsUpDown className="h-4 w-4 text-gray-400" />;
    return sortDirection === "asc"
      ? <ChevronUp className="h-4 w-4 text-blue-600" />
      : <ChevronDown className="h-4 w-4 text-blue-600" />;
  };

  const renderCell = (column: Column<T>, item: T) => {
    if (column.render) return column.render(item);
    if (!(column.key in item)) return "";
    return item[column.key as keyof T] as React.ReactNode;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {searchKey && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              {columns.map((col) => (
                <TableHead key={String(col.key)}>
                  {col.sortable && isRealSortable(col.key) ? (
                    <Button
                      className="-ml-3 h-8"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}
                      {getSortIcon(col.key)}
                    </Button>
                  ) : (
                    col.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item, idx) => (
                <TableRow key={idx} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      {renderCell(col, item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}