import { ElectricAll } from "../App";
import { Car, Make } from "../dto/car";
import { Dropdown } from "../shared/dropdown";
import "./filters.css";

export function Filter({
  filters,
  setFilters,
}: {
  filters: Car;
  setFilters: (newFilters: Car) => void;
}) {
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
}
