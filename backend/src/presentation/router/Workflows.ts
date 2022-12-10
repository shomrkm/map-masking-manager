import express, { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/shared/core/middleware';
import { protect, authorize } from '@/shared/core/middleware/authorization';
import { WorkflowController } from '@/presentation/controller/WorkflowController';
import { router as taskRouter } from './Tasks';

export const router = express.Router();

const workflowController = new WorkflowController();

router.use('/:workflowid/tasks', taskRouter);

// @desc Create new workflow
// @route POST /api/v1/workflows
// @access Private
export const createWorkflow = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.createUser = req.user.id;
      const workflow = await workflowController.createWorkflow(req);
      res.status(201).json(workflow);
    } catch (err) {
      next(err);
    }
  }
);

// @desc Delete workflow
// @route DELETE /api/v1/workflows/:id
// @access Private
export const deleteWorkflow = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workflow = await workflowController.deleteWorkflow(req);
      res.status(200).json(workflow);
    } catch (err) {
      next(err);
    }
  }
);

// @desc Update Workflow
// @route PUT /api/v1/workflows/:workflowid
// @access Private
export const updateWorkflow = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workflow = await workflowController.updateWorkflow(req);
      res.status(200).json(workflow);
    } catch (err) {
      next(err);
    }
  }
);

router
  .route('/')
  .get(asyncHandler(workflowController.getWorkflows.bind(workflowController)))
  .post(protect, authorize('publisher', 'admin'), createWorkflow);

router
  .route('/:id')
  .get(asyncHandler(workflowController.getWorkflow.bind(workflowController)))
  .put(protect, authorize('publisher', 'admin'), updateWorkflow)
  .delete(protect, authorize('publisher', 'admin'), deleteWorkflow);
