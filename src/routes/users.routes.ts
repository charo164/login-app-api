import express from 'express';
import { index, show, create, update, destroy } from '../controllers/users.controllers';
import { requireAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', requireAuth, index);
router.get('/:id', requireAuth, show);
router.post('/', requireAuth, create);
router.put('/:id', requireAuth, update);
router.delete('/:id', requireAuth, destroy);

export default router;
