import { ColDef, GridOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { ElectricAll } from "../App";
import { Car, Make } from "../dto/car";
import "./grid.css";

export function Grid({ data: cars, filters }: { data: Car[]; filters: Car }) {
  const filteredCars = cars.filter(
    (car) =>
      [Make.All, car.make].includes(filters.make) &&
      car.model.toLowerCase().includes(filters.model.toLowerCase()) &&
      [ElectricAll, car.electric].includes(filters.electric)
  );

  const columnDefs: ColDef<Car>[] = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" },
    {
      headerName: "Electric",
      field: "electric",
      valueFormatter: (params) => (params.value ? "Yes" : "No"),
    },
  ];
  const gridOptions: GridOptions<Car> = {
    defaultColDef: {
      flex: 1,
    },
    // Pagination
    pagination: true,
    paginationPageSize: 5,
    paginationPageSizeSelector: [5, 500, 1000],
  };

  return (
    <div className="grid-container">
      <div className="ag-theme-quartz ag-grid">
        <AgGridReact
          rowData={filteredCars}
          columnDefs={columnDefs}
          {...gridOptions}
        />
      </div>
    </div>
  );
}
