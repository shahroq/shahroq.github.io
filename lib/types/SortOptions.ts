export type SortDirection = "asc" | "desc";

export type SortOption<T> = {
  key: keyof T;
  direction: SortDirection;
};

export type SortOptions<T> = SortOption<T>[];
