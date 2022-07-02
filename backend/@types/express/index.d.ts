interface AdvancedResults {
  success: boolean;
  count: number;
  pagination: any;
  data: any;
}

declare namespace Express {
  export interface Request {
    user: string;
  }
  export interface Response {
    advancedResults: AdvancedResults;
  }
}
