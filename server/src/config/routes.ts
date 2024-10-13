import express from 'express';
import passport from 'passport';
import { query, body } from 'express-validator';

import { registerUser, logIn, getCurrentUser, logOut } from '../controllers/auth_controller';
import { indexUsers } from '../controllers/users_controller';
import { indexRecipes, createRecipe, editRecipe, getRecipe } from '../controllers/recipes_controller';

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
recipeRouter.get('/', query('search_term').trim().escape(), indexRecipes);
recipeRouter.get('/:id', getRecipe);
recipeRouter.post('/', createRecipe);
recipeRouter.put('/:id', body('title').trim().notEmpty(), body('description').trim().notEmpty(), editRecipe);
router.use('/recipes', recipeRouter);

export default router;