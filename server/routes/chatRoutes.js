import express from 'express';
import { createChat, deleteChat, getChats } from '../controller/chatController.js';
import { protect } from '../middleware/auth.js';

const chatRouter = express.Router();

chatRouter.get('/create',protect,createChat);
chatRouter.get('/get',protect,getChats);
chatRouter.post('/delete',protect,deleteChat);

export default chatRouter;