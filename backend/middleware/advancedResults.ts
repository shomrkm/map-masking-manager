import { Request, Response, NextFunction } from 'express';

type Populate = {
  path: string;
  select?: string;
};

export const advancedResults =
  (model: any, populate?: Populate[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // Copy req.query
    const reqQuery = { ...req.query };
    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];
    // Loop over removeFields and delete
    removeFields.forEach((param) => delete reqQuery[param]);
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
    // Finding resource
    const query = model.find(JSON.parse(queryStr));
    // Select Fields
    if (req.query.select) {
      const fields = (req.query.select as string).split(',').join(' ');
      query.select(fields);
    }
    // Sort
    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(',').join(' ');
      query.sort(sortBy);
    } else {
      query.sort('-createAt');
    }

    // Pagination
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query.skip(startIndex).limit(limit);

    if (populate) {
      populate.forEach((p) => query.populate(p));
    }

    // Executing query
    const results = await query;

    // Pagenation result
    let pagination = {};
    if (endIndex < total) {
      pagination = {
        next: {
          page: page + 1,
          limit,
        },
      };
    }
    if (startIndex > 0) {
      pagination = {
        ...pagination,
        prev: {
          page: page - 1,
          limit,
        },
      };
    }

    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };

    next();
  };
