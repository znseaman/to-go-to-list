import { Router } from 'express';
import controllers from './place.controllers';

const router = Router();

// /api/place
router
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne)

// /api/place/all
router
  .route('/all')
  .get(controllers.getMany)

// /api/place/:id
router
  .route('/:id(\\d+)/')
  .get(controllers.getOne)
  .delete(controllers.removeOne)

export default router;
