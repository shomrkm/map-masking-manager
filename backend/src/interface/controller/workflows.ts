import { Request, Response, NextFunction } from 'express';
import { Workflow } from '@/infrastructure/database/models/Workflows';
import { ErrorResponse } from './errorResponse';
import { asyncHandler } from './asyncHandler';

// @desc Get all workflows
// @route GET /api/v1/workflows
// @access Public
export const getWorkflows = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.advancedResults);
  }
);

// @desc Get single workflow
// @route GET /api/v1/workflows/:id
// @access Public
export const getWorkflow = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const workflow = await Workflow.findById(req.params.id).populate({
    path: 'createUser',
    select: 'name avatar',
  });
  if (!workflow) {
    return next(new ErrorResponse(`Workflow not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: workflow });
});

// @desc Create new workflow
// @route POST /api/v1/workflows
// @access Private
export const createWorkflow = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.createUser = req.user.id;
    const workflow = await Workflow.create(req.body);

    res.status(201).json({
      success: true,
      data: workflow,
    });
  }
);

// @desc Update workflow
// @route PUT /api/v1/workflows/:id
// @access Private
export const updateWorkflow = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!(await Workflow.findById(id))) {
      return next(new ErrorResponse(`Workflow not found with id of ${req.params.id}`, 404));
    }

    const workflow = await Workflow.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: workflow });
  }
);

// @desc Delete workflow
// @route DELETE /api/v1/workflows/:id
// @access Private
export const deleteWorkflow = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const workflow = await Workflow.findById(id);
    if (!workflow) {
      return next(new ErrorResponse(`Workflow not found with id of ${id}`, 404));
    }

    // Make sure user is workflow owner
    if (workflow.createUser.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User ${req.user.id} is not authorized to delete this workflow`, 401)
      );
    }

    workflow.remove();

    res.status(200).json({ success: true, data: {} });
  }
);
