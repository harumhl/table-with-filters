import { useEffect, useState } from "react";

import { GridOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { Car } from "./dto/car";
import { getData } from "./api/car";
import "./App.css";

const gridOptions: GridOptions<Car> = {
  // Columns to be displayed (Should match rowData properties)
  columnDefs: [
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price", filter: true },
    { field: "electric", filter: true },
  ],
  defaultColDef: {
    flex: 1,
  },
  // Pagination
  pagination: true,
  paginationPageSize: 10,
  paginationPageSizeSelector: [10, 500, 1000],
};

function App() {
  const [data, setData] = useState<Car[]>();

  useEffect(() => {
    async function fetchData() {
      const d = await getData();
      setData(d);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={data} {...gridOptions} />
      </div>
    </div>
  );
}

export default App;
