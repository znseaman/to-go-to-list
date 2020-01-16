import { Router } from 'express';
import controllers from './user.controllers';

const router = Router();

// /api/user
router
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne)

// /api/user/:id
router
  .route('/:id')
  .get(controllers.getOne)

export default router;
