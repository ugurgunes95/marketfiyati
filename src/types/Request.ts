import { Category } from ".";

export enum Endpoint {
  byKeyword = "search",
  byCategory = "searchByCategories",
}

export type Payload = {
  keywords: Category;
  pages: number;
  size: number;
  menuCategory?: boolean;
  longitude?: string;
  latitude?: string;
  distance?: number;
};

export type PayloadByKeyword = {
  keywords: string;
  pages: number;
  size: number;
  longitude?: string;
  latitude?: string;
  distance?: number;
};
