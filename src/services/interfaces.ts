export interface Employee {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  employmentType: string;
  startDate: string;
  hoursPerWeek: number;
}

export enum Filter {
  FullTime = "FullTime",
  PartTime = "PartTime",
  Casual = "Casual",
  Contract = "Contract",
}
