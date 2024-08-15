import { Router } from "express";
const router = Router();

import { addtocart, deleteitem, getadmindata, getitems } from "../Controllers/cart.js";

router.post('/api/addtoCart', addtocart);
router.get('/getitems', getitems);
router.delete('/deleteitem/:id', deleteitem);
router.get('/getAdminData', getadmindata)

export default router;