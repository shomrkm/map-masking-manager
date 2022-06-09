import { Response } from 'express';

export type AdvancedResponse = Response & {
  advancedResults?: {
    success: boolean;
    count: number;
    pagination: any;
    data: any;
  };
};
