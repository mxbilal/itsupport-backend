import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userProfile?: any; // Define the custom property
    }
  }
}

export interface PaginationQueryParams {
  PageNumber: string;
  pageSize: string;
  SortColumn?: string;
  SortOrder?: 'a' | 'd';
  Search?: string;
}
