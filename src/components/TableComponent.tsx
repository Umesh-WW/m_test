import React, { useEffect, useRef } from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt";
import { Paper, Box } from "@mui/material";
import "./muli-step-form.css";
import { RootState } from "../Store/store";
import DataTables from "datatables.net-dt";
import { useSelector } from "react-redux";

const columns = [
  { data: "name", title: "Name" },
  { data: "age", title: "Age" },
  { data: "sex", title: "Sex" },
  { data: "mobile", title: "Mobile" },
  { data: "govtIdType", title: "Govt. Id Type" },
  { data: "govtId", title: "Govt. Id " },
  { data: "address", title: "Name" },
  { data: "state", title: "State" },
  { data: "city", title: "City" },
  { data: "country", title: "Country" },
  { data: "pincode", title: "Pincode" },
];

const TableComponent: React.FC = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const data1 = useSelector((state: RootState) => state.form.data);
  useEffect(() => {
    const dt = new DataTables(tableRef.current!, {
      columns: columns,
      data: data1,
    });
    return () => {
      dt.destroy();
    };
  }, [data1]);

  return (
    <Paper className="main-page table-comp">
      <Box component={"h1"}> Table</Box>
      <table ref={tableRef}></table>
    </Paper>
  );
};

export default TableComponent;
