import React, { useState, useMemo } from "react";
import {
  Table as BootstrapTable,
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import "./Customtable.css";

const CustomTable = ({ headers, data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    headers.map((header) => ({ name: header, visible: true }))
  );
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter((row) =>
      Object.entries(row).some(
        ([key, value]) =>
          visibleColumns.find((col) => col.name === key)?.visible &&
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, visibleColumns]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) =>
      prev.map((col) =>
        col.name === column ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="p-3 table-container">
      {/* Search */}
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Column Visibility Toggles */}
      <div className="mb-3">
        {headers.map((header) => (
          <Form.Check
            key={header}
            type="checkbox"
            id={`toggle-${header}`}
            label={header}
            checked={
              visibleColumns.find((col) => col.name === header)?.visible || false
            }
            onChange={() => toggleColumnVisibility(header)}
            inline
          />
        ))}
      </div>

      {/* Table */}
      <BootstrapTable striped bordered hover responsive className="w-100">
        <thead>
          <tr>
            {visibleColumns
              .filter((col) => col.visible)
              .map((col) => (
                <th
                  key={col.name}
                  onClick={() => handleSort(col.name)}
                  style={{ cursor: "pointer" }}
                >
                  {col.name}{" "}
                  {sortConfig.key === col.name ? (
                    sortConfig.direction === "asc" ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : (
                    <FaSort />
                  )}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {visibleColumns
                .filter((col) => col.visible)
                .map((col) => (
                  <td
                    key={col.name}
                    dangerouslySetInnerHTML={{ __html: row[col.name] }}
                  ></td>
                ))}
            </tr>
          ))}
        </tbody>
      </BootstrapTable>

      {/* Pagination */}
      <div className="pagination-container">
        {/* Rows per page */}
        <div className="rows-dropdown">
          <span>Rows per page:</span>
          <Form.Select
  size="sm"
  className="rows-dropdown-select"
  value={rowsPerPage}
  onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
>
  {[5, 10, 20, 50].map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ))}
</Form.Select>
        </div>

        {/* Page numbers */}
        <div className="page-buttons">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={i + 1 === currentPage ? "primary" : "outline-secondary"}
              className={i + 1 === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
