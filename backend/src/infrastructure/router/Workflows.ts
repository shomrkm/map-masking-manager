import express, { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/shared/core/middleware';
import { WorkflowController } from '@/adapter/controller/WorkflowController';
import { MongoDBConnection } from '../mongoose/MongoDBConnection';
import { protect, authorize } from '../../shared/core/middleware/authorization';
import { router as taskRouter } from './Tasks';

export const router = express.Router();

const mongoDBConnection = new MongoDBConnection();
const workflowController = new WorkflowController(mongoDBConnection);

router.use('/:workflowid/tasks', taskRouter);

// @desc Get all workflows
// @route GET /api/v1/workflows
// @access Public
export const getWorkflows = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workflows = await workflowController.getWorkflows(req);
      res.status(200).json(workflows);
    } catch (err) {
      next(err);
    }
  }
);

// @desc Get single workflow
// @route GET /api/v1/workflows/:id
// @access Public
export const getWorkflow = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workflow = await workflowController.getWorkflow(req);
    res.status(200).json(workflow);
  } catch (err) {
    next(err);
  }
});

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

router.route('/').get(getWorkflows).post(protect, authorize('publisher', 'admin'), createWorkflow);

router
  .route('/:id')
  .get(getWorkflow)
  .put(protect, authorize('publisher', 'admin'), updateWorkflow)
  .delete(protect, authorize('publisher', 'admin'), deleteWorkflow);
