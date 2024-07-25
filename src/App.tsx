import { useEffect, useState } from "react";

import { createGrid, GridApi, GridOptions } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import "./App.css";

interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

const gridOptions: GridOptions<IRow> = {
  // Data to be displayed
  rowData: [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ],
  // Columns to be displayed (Should match rowData properties)
  columnDefs: [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ],
  defaultColDef: {
    flex: 1,
  },
};


function App() {
  useEffect(() => {
    const gridApi: GridApi = createGrid(
      document.querySelector<HTMLElement>("#myGrid")!,
      gridOptions
    );  
  });
  return (
    <div className="App">
      <div
        id="myGrid"
        className="ag-theme-quartz"
        style={{ height: "500px" }}
      ></div>
    </div>
  );
}

export default App;
