import express, { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/shared/core/middleware';
import { protect, authorize } from '@/shared/core/middleware/authorization';
import { TaskController } from '../controller/TaskController';
import { router as commentRouter } from './Comments';

const controller = new TaskController();

export const router = express.Router({ mergeParams: true });

// Re-route into other resource routers
router.use('/:taskid/comments', commentRouter);

// @route GET /api/v1/tasks (Public)
// @route GET /api/v1/workflows/:workflowid/tasks (Public)
// @route POST /api/v1/tasks (Private/admin)
router
  .route('/')
  .get(asyncHandler(controller.getTasks.bind(controller)))
  .post(
    protect,
    authorize('publisher', 'admin'),
    asyncHandler(controller.createTask.bind(controller))
  );

// @route GET /api/v1/tasks/:id (Public)
// @route PUT /api/v1/tasks/:taskid (Private/adamin)
// @route DELETE /api/v1/tasks/:id (Private/admin)
router
  .route('/:id')
  .get(asyncHandler(controller.getTask.bind(controller)))
  .put(
    protect,
    authorize('publisher', 'admin'),
    asyncHandler(controller.updateTask.bind(controller))
  )
  .delete(
    protect,
    authorize('publisher', 'admin'),
    asyncHandler(controller.deleteTask.bind(controller))
  );
