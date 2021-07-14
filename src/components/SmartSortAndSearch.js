import React, { useState, useMemo } from "react";
import styled from "styled-components";

const DIV = styled.div`
  .chartBox {
    display: flex;
    width: 100%;
    margin-bottom: 30px;
    flex-direction: column;
    position: relative;
    padding: 10px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 15px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    margin: 2px;
    overflow-x: scroll;
  }
  .container-head {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    width: 100%;
    margin-bottom: 5px;
  }
  .container-head h1 {
    color: #fff;
    text-align: center;
  }
  table {
    color: #fff;
    text-align: left;
  }
  table > thead > tr > th {
    border-bottom: none !important;
    border-style: transparent !important;
    border-color: transparent !important;
    border-width: 0 !important;
  }
  .basic-table1 {
    background: rgba(0, 251, 71, 0.3);
  }

  .th-box {
    padding: 5px 5px 5px 0;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .th-title {
    padding: 5px 5px 5px 0;
  }
  .sort-button {
    float: right;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin: auto 2px;
  }
  .sort-button .fas {
    line-height: 0;
  }
  .sort-button .fas.fa-sort-up {
    color: ${({ sortConfig }) =>
      sortConfig?.direction === "descending" ? "#000" : "#fff"};
  }

  .sort-button .fas.fa-sort-down {
    color: ${({ sortConfig }) =>
      sortConfig?.direction === "ascending" ? "#000" : "#fff"};
  }

  @media (max-width: 337px) {
    .container-head h1 {
      font-size: 20px;
    }
  }
  @media (min-width: 768px) {
    .chartBox {
      width: 100%;
    }
  }
`;

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    console.log("key>>", key);
    console.log("sortConfig.key", sortConfig?.key, sortConfig?.direction);

    let direction = "ascending";

    if (sortConfig?.key === key && sortConfig?.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const SmartSortAndSearch = ({ data }) => {
  const { items, requestSort, sortConfig } = useSortableData(data);
  console.log("items>>>", items);
  console.log("requestSort>>>", requestSort);
  console.log("sortConfig>>>", sortConfig);

  return (
    <DIV sortConfig={sortConfig}>
      <div className="chartBox">
        <div className="container-head">
          <h1>Basic table</h1>
        </div>
        <table className="table mt-3">
          <thead className="basic-table1">
            <tr>
              <th scope="col">
                <div className="th-box">
                  <div className="th-title">#</div>
                </div>
              </th>
              <th scope="col">
                <div className="th-box">
                  <div className="th-title">Name</div>
                  <div
                    onClick={() => requestSort("name")}
                    className="sort-button"
                  >
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="th-box">
                  <div className="th-title">Work</div>
                  <div
                    onClick={() => requestSort("website")}
                    className="sort-button"
                  >
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="th-box">
                  <div className="th-title">E-Mail</div>
                  <div
                    onClick={() => requestSort("email")}
                    className="sort-button"
                  >
                    <i class="fas fa-sort-up"></i>
                    <i class="fas fa-sort-down"></i>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((person, index) => (
              <tr key={person.id}>
                <th scope="row">{index + 1}</th>
                <td>{person.name}</td>
                <td>{person.website}</td>
                <td>{person.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DIV>
  );
};
export default SmartSortAndSearch;
