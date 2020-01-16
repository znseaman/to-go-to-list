import { Router } from 'express';
import controllers from './place.controllers';

const router = Router();

// /api/place
router
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne)

// /api/place/:id
router
  .route('/:id')
  .get(controllers.getOne)

export default router;
