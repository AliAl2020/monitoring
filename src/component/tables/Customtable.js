import React, { useState, useMemo } from "react";
import { Table as BootstrapTable, Form, InputGroup } from "react-bootstrap";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

import "./Customtable.css"; // Import your CSS file for styling

const CustomTable = ({ headers, data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(
    headers.map((header) => ({ name: header, visible: true }))
  );
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.name === column ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <div  className="p-3 table-container"> 
      {/* Search Field */}
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Toggle Column Visibility */}
      <div className="mb-3">
        {headers.map((header) => (
          <Form.Check
            key={header}
            type="checkbox"
            id={`toggle-${header}`}
            label={header}
            checked={visibleColumns.find((col) => col.name === header)?.visible || false}
            onChange={() => toggleColumnVisibility(header)}
            inline
          />
        ))}
      </div>

      {/* Table */}
      <BootstrapTable striped bordered hover>
        <thead>
          <tr>
            {visibleColumns
              .filter((col) => col.visible)
              .map((col) => (
                <th
                  key={col.name}
                  onClick={() => handleSort(col.name)}
                  style={{ cursor: 'pointer' }}
                >
                  {col.name}{' '}
                  {sortConfig.key === col.name ? (
                    sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
                  ) : (
                    <FaSort />
                  )}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {visibleColumns
                .filter((col) => col.visible)
                .map((col) => (
                  <td key={col.name} dangerouslySetInnerHTML={{ __html: row[col.name] }}></td>
                ))}
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
    </div>
  );
};

export default CustomTable;