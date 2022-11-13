export const buildPaginationData = (req: any, data: any[]) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 100;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = data.length;
  const lastPage = Math.floor(total / limit);

  let pagination = {};
  if (endIndex < total) {
    pagination = {
      next: {
        page: page + 1,
        limit: lastPage,
      },
    };
  }
  if (startIndex > 0) {
    pagination = {
      ...pagination,
      prev: {
        page: page - 1,
        limit: lastPage,
      },
    };
  }

  return {
    count: total,
    pagination,
    data: data.slice(startIndex, endIndex),
  };
};
