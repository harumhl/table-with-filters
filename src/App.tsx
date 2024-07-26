import { useEffect, useState } from "react";

import { ColDef, GridOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { Dropdown } from "./shared/dropdown";
import { Car, Make } from "./dto/car";
import { getData } from "./api/car";
import "./App.css";

const ElectricAll = null;

const Filter: React.FC<{
  filters: Car;
  setFilters: (newFilters: Car) => void;
}> = ({ filters, setFilters }) => {
  const electricFilterOptions: { option: string; value: boolean }[] = [
    { option: "All", value: ElectricAll! },
    { option: "Electric only", value: true },
    { option: "Non electric only", value: false },
  ];
  return (
    <>
      <h2>Filter Options</h2>
      <Dropdown
        title="Make"
        value={filters.make}
        options={Object.values(Make)}
        onChange={(newMake: Make) => {
          setFilters({
            ...filters,
            make: newMake,
          });
        }}
      />
      <div>
        <label className="input-label">Model:</label>
        <input
          className="model-input"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilters({
              ...filters,
              model: event.target.value,
            });
          }}
        ></input>
      </div>
      <div>
        <Dropdown
          title="Electric"
          value={
            electricFilterOptions.find((o) => o.value === filters.electric)
              ?.option!
          }
          options={electricFilterOptions.map((o) => o.option)}
          onChange={(newElectric: string) => {
            const electricFilterOption = electricFilterOptions.find(
              (o) => o.option === newElectric
            );
            setFilters({
              ...filters,
              electric: electricFilterOption?.value!,
            });
          }}
        />
      </div>
    </>
  );
};

const Grid: React.FC<{ data: Car[]; filters: Car }> = ({
  data: cars,
  filters,
}) => {
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
};

function App() {
  const [data, setData] = useState<Car[]>([]);
  const [filters, setFilters] = useState<Car>({
    make: Make.All,
    model: "",
    price: -1,
    electric: null!,
  });

  useEffect(() => {
    async function fetchData() {
      setData(await getData());
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="sidebar-component">
        <Filter filters={filters} setFilters={setFilters} />
      </div>
      <div className="grid-component">
        <Grid data={data} filters={filters} />
      </div>
    </div>
  );
}

export default App;
