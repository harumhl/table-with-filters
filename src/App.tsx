import { useEffect, useState } from "react";

import { Filter } from "./components/filters";
import { Grid } from "./components/grid";
import { Car, Make } from "./dto/car";
import { getData } from "./api/car";
import "./App.css";

export const ElectricAll = null;

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
