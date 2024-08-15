import { Router } from "express";
const router = Router();

import { authon, register, userdata, userpass } from "../Controllers/login.js";

router.post('/login', authon);
router.post('/register', register);
router.get('/userData', userdata);
router.get('/getuserpass', userpass)

export default router;