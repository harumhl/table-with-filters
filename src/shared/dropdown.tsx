import "./dropdown.css";

interface DropdownProps<T> {
  title?: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string | number;
}

export const Dropdown = <T extends {}>({
  title,
  value,
  options,
  onChange,
  getOptionLabel = (option) => `${option}`,
  getOptionValue = (option) => `${option}`,
}: DropdownProps<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find(
      (option) => getOptionValue(option).toString() === event.target.value
    );
    if (selectedOption !== undefined) {
      onChange(selectedOption);
    }
  };

  return (
    <div>
      <label className="dropdown-label" htmlFor="dropdown">
        {title ?? "Select"}:
      </label>
      <select
        id="dropdown"
        value={getOptionValue(value).toString()}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option
            key={getOptionValue(option).toString()}
            value={getOptionValue(option)}
          >
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
    </div>
  );
};
