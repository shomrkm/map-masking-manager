import express, { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/shared/core/middleware';
import { protect, authorize } from '@/shared/core/middleware/authorization';
import { WorkflowController } from '@/presentation/controller/WorkflowController';
import { router as taskRouter } from './Tasks';

export const router = express.Router();

const controller = new WorkflowController();

router.use('/:workflowid/tasks', taskRouter);

router
  .route('/')
  .get(asyncHandler(controller.getWorkflows.bind(controller)))
  .post(
    protect,
    authorize('publisher', 'admin'),
    asyncHandler(controller.createWorkflow.bind(controller))
  );

router
  .route('/:id')
  .get(asyncHandler(controller.getWorkflow.bind(controller)))
  .put(
    protect,
    authorize('publisher', 'admin'),
    asyncHandler(controller.updateWorkflow.bind(controller))
  )
  .delete(
    protect,
    authorize('publisher', 'admin'),
    asyncHandler(controller.deleteWorkflow.bind(controller))
  );
