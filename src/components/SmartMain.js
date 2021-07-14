import React, { useState, useEffect } from "react";

import axios from "axios";
import SmartSortAndSearch from "./SmartSortAndSearch";

const SmartMain = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        let result = res.data;
        setData(result);
      });
  };

  console.log("data", data);

  return (
    <div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <SmartSortAndSearch data={data} />
        </div>
        {/* <div className="col-md-6 col-sm-12">
          <BasicTableStripped data={data} />
        </div> */}
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
