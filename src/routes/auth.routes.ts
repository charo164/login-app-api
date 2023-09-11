import express from 'express';
import {
  googleLoginLink,
  loggedUser,
  loginWithGoogle,
  signIn,
  signOut,
  signUp,
} from '../controllers/auth.controllers';
import { requireAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/login', signIn);
router.post('/signup', signUp);
router.post('/logout', signOut);
router.get('/me', requireAuth, loggedUser);

router.get('/google/callback', loginWithGoogle);
router.get('/google/loginLink', googleLoginLink);

export default router;
