import express, { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/interface/controller/asyncHandler';
import {
  getWorkflow,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
} from '@/interface/controller/workflows';
import { WorkflowController } from '@/interface/controller/WorkController';
import { advancedResults } from '@/interface/controller/advancedResults';
import { Workflow } from '@/infrastructure/database/models/Workflows';
import { MongoDBConnection } from '../database/MongoDBConnection';
import { protect, authorize } from '../middleware/authorization';
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

router
  .route('/')
  .get(advancedResults(Workflow, [{ path: 'createUser', select: 'name avatar' }]), getWorkflows)
  .post(protect, authorize('publisher', 'admin'), createWorkflow);

router
  .route('/:id')
  .get(getWorkflow)
  .put(protect, authorize('publisher', 'admin'), updateWorkflow)
  .delete(protect, authorize('publisher', 'admin'), deleteWorkflow);
