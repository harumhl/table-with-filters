export enum Make {
  All = "All",
  Tesla = "Tesla",
  Ford = "Ford",
  Toyota = "Toyota",
  Mercedes = "Mercedes",
  Fiat = "Fiat",
  Nissan = "Nissan",
}

export interface Car {
  make: Make;
  model: string;
  price: number;
  electric: boolean;
}
