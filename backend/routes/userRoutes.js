import express from 'express'
import { getUserData,Login, Logout, registerUser } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.get('/me',userAuth,getUserData)
userRouter.post('/register',registerUser)
userRouter.post('/login',Login)
userRouter.post('/logout',Logout)



export default userRouter;