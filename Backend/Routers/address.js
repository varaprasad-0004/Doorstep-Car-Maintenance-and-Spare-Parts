import { Router } from "express";
const router = Router();

import { daddress, getadd } from "../Controllers/address.js";

router.post('/addaddress.js', daddress);
router.get('/getaddressdata.js', getadd);

export default router;