export interface CrimeFilterType {
  [category: string]: {
    [subcategory: string]: string[];
  };
}

export type CrimeFilterState = Record<string, boolean>; // This ensures all codes are treated as strings and values are booleans
