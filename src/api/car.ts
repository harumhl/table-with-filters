import { Car, Make } from "../dto/car";

async function getData(): Promise<Car[]> {
  return [
    { make: Make.Tesla, model: "Model Y", price: 64950, electric: true },
    { make: Make.Ford, model: "F-Series", price: 33850, electric: false },
    { make: Make.Toyota, model: "Corolla", price: 29600, electric: false },
    { make: Make.Mercedes, model: "EQA", price: 48890, electric: true },
    { make: Make.Fiat, model: "500", price: 15774, electric: false },
    { make: Make.Nissan, model: "Juke", price: 20675, electric: false },
  ];
}

export { getData };
