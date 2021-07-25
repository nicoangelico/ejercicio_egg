import { Router } from "express";
import {
    singup,
    singin,
    logout,
} from "../controllers/auth.controller.js";

const router = Router()

router.post("/api/singin", singin);
router.post("/api/singup", singup);
router.post("/api/logout", logout);

export default router;