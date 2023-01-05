export type ChartsData = {
  weeknum: string[];

  new_case_excludeabroad: number[]; // new cases domestic
  case_foreign: number[]; // new cases abroad
  case_prison: number[]; // new cases in prison
  case_walkin: number[]; // new cases by walk-in test
  total_case: number[];

  new_recovered: number[];
  total_recovered: number[];
};
