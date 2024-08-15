import { Router } from "express";
const router = Router();

import { addspare, getspare } from "../Controllers/dynamicform.js";

router.post('/addspares', addspare)
router.get('/getspares', getspare)

export default router;