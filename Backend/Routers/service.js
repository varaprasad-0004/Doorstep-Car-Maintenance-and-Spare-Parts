import { Router } from "express";
const router = Router();

import { getser, service } from "../Controllers/service.js";

router.post('/addservice', service)
router.get('/getser', getser)

export default router;