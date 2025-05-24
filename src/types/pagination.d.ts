export interface IPagination {
  skip: number;
  limit: number;
  total: number;
  start: number;
  end: number;
  is_next: boolean;
  is_prev: boolean;
}
