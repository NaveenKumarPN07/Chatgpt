import express from 'express';
import { getPubishedImages, getUser, LoginUser, registerUser } from '../controller/userController.js';
import { protect } from '../middleware/auth.js';



const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',LoginUser)
userRouter.get('/data',protect,getUser)
userRouter.get('/published-images',protect,getPubishedImages)

export default userRouter;
