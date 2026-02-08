import express from 'express';
import { protect } from '../middleware/auth.js';
import { getPlans, purchasePlan } from '../controller/creditController.js';

const Router = express.Router();

Router.get("/plans",getPlans);
Router.post("/purchase",protect,purchasePlan);

export default Router;