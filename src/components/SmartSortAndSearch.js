import React, { useState, useMemo, useEffect } from "react";
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
    position: relative;
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
  .search-box {
    position: absolute;
    z-index: 3;
    top: -35px;
    left: 0px;
    display: flex;
  }
  .search-box input[type="text"] {
    width: 200px;
    height: 30px;
    outline: none;
    background: transparent;
    padding: 3px 8px;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.18);
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #ccc;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      color: #ccc;
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      color: #ccc;
    }
    :-moz-placeholder {
      /* Firefox 18- */
      color: #ccc;
    }
  }
  select {
    height: 30px;
    outline: none;
    background: none;
    padding: 3px 8px;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  select:active,
  select:hover {
    outline: none;
    background: transparent !important;
  }
  select option:active,
  select option:hover {
    outline: none;
    background: transparent !important;
  }
  select option:hover {
    background-color: #00a78e !important; /* for IE */
    color: #fff !important;
  }

  select option {
    background-color: transparent !important; /* for IE */
    color: #00a78e !important;
  }
  /* .search-box input[name="search"] {
    width: 200px;
    height: 30px;
  } */

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
  const [searched, setSearched] = useState(items);
  const [selected, setSelected] = useState("name");

  useEffect(() => {
    setSearched(items);
  }, [items]);
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    let result = [];
    if (selected === "name") {
      result = items.filter((person) =>
        person.name.toLowerCase().includes(value)
      );
    }
    if (selected === "work") {
      result = items.filter((person) =>
        person.website.toLowerCase().includes(value)
      );
    }
    if (selected === "e-mail") {
      result = items.filter((person) =>
        person.email.toLowerCase().includes(value)
      );
    }

    setSearched(result);
  };

  return (
    <DIV sortConfig={sortConfig}>
      <div className="chartBox">
        <div className="container-head">
          <h1>Basic table</h1>
        </div>
        <table className="table mt-5">
          <span className="search-box">
            <input
              type="text"
              placeholder="Type to search..."
              onChange={handleSearch}
            />
            <select
              name="searchValues"
              id="searchingField"
              onChange={handleSelect}
            >
              <option className="custom-options" value="name">
                name
              </option>
              <option className="custom-options" vale="work">
                work
              </option>
              <option className="custom-options" value="e-mail">
                e-mail
              </option>
            </select>
          </span>
          <thead className="basic-table1">
            <tr>
              <th scope="col">
                <span className="th-box">
                  <span className="th-title">#</span>
                </span>
              </th>
              <th scope="col">
                <span className="th-box">
                  <span className="th-title">Name</span>
                  <span
                    onClick={() => requestSort("name")}
                    className="sort-button"
                  >
                    <i className="fas fa-sort-up"></i>
                    <i className="fas fa-sort-down"></i>
                  </span>
                </span>
              </th>
              <th scope="col">
                <span className="th-box">
                  <span className="th-title">Work</span>
                  <span
                    onClick={() => requestSort("website")}
                    className="sort-button"
                  >
                    <i className="fas fa-sort-up"></i>
                    <i className="fas fa-sort-down"></i>
                  </span>
                </span>
              </th>
              <th scope="col">
                <span className="th-box">
                  <span className="th-title">E-Mail</span>
                  <span
                    onClick={() => requestSort("email")}
                    className="sort-button"
                  >
                    <i className="fas fa-sort-up"></i>
                    <i className="fas fa-sort-down"></i>
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {searched.map((person, index) => (
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
