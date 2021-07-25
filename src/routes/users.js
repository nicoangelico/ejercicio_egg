import { Router } from "express";
import {
    getProfile,
    updateProfile,
    getSons,
    createSon,
    updateSon,
    deleteSon,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { verifyUserExist, verifyUserIsAFather } from "../middleware/user.js";

const router = Router()

router.get('/api/users/profile', verifyToken, verifyUserExist, getProfile);
router.put('/api/users/profile', verifyToken, verifyUserExist, verifyUserIsAFather, updateProfile);
router.get('/api/users/sons', verifyToken, verifyUserExist, verifyUserIsAFather, getSons);
router.post('/api/users/sons', verifyToken, verifyUserExist, verifyUserIsAFather, createSon);
router.put('/api/users/sons/:id', verifyToken, verifyUserExist, verifyUserIsAFather, updateSon);
router.delete('/api/users/sons/:id', verifyToken, verifyUserExist, verifyUserIsAFather, deleteSon);

export default router;