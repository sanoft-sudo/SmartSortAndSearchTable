import React, { useState, useEffect } from "react";

import axios from "axios";
import SmartSortAndSearch from "./SmartSortAndSearch";
import SmartSortSearchPagination from "./SmartSortSearchPagination";

const SmartMain = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    getData();
    getData2();
  }, []);

  const getData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        let result = res.data;
        setData(result);
      });
  };

  const getData2 = async () => {
    await axios.get("https://randomuser.me/api/?results=20").then((res) => {
      let result2 = res.data.results;
      result2.map((person) =>
        setNewData((currentArray) => [
          ...currentArray,
          {
            name: person.name.first + " " + person.name.last,
            email: person.email,
            phone: person.phone
          }
        ])
      );
    });
  };

  console.log("data1", data);
  console.log("data2", newData);
  const columns = [
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Phone",
      accessor: "phone"
    }
  ];

  return (
    <div>
      <div className="row">
        {/* <div className="col-md-6 col-sm-12">
          <SmartSortAndSearch data={data} />
        </div> */}
        <div className="col-md-12 col-sm-12">
          <SmartSortSearchPagination data={newData} columns={columns} />
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-6 col-sm-12">
          <BasicTabelStrippedHoverable data={data} />
        </div>
        <div className="col-md-6 col-sm-12">
          <BasicTabelBordered data={data} />
        </div>
      </div> */}
    </div>
  );
};

export default SmartMain;
