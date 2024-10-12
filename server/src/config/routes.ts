import express from 'express';
import passport from 'passport';

import { registerUser, logIn, getCurrentUser, logOut } from '../controllers/auth_controller';
import { indexUsers } from '../controllers/users_controller';
import { createRecipe, indexRecipes } from '../controllers/recipes_controller';

const router = express.Router();

const authRouter = express.Router();
authRouter.post('/register', registerUser);
authRouter.post('/login', logIn);

authRouter.use(passport.authenticate('jwt', { session: false }));
authRouter.get('/current-user', getCurrentUser);
authRouter.post('/logout', logOut);
router.use('/auth', authRouter);

const userRouter = express.Router();
userRouter.use(passport.authenticate('jwt', { session: false }));
userRouter.get('/', indexUsers);
router.use('/users', userRouter);

const recipeRouter = express.Router();
recipeRouter.use(passport.authenticate('jwt', { session: false }));
recipeRouter.get('/', indexRecipes);
recipeRouter.post('/', createRecipe);
router.use('/recipes', recipeRouter);

export default router;