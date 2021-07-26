import { Router } from "express";
import { authController } from '../controllers/AuthController';

class AuthRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post("/api/singin", authController.singin);
        this.router.post("/api/singup", authController.singup);
        // this.router.post("/api/logout", authController.logout);
    }

}

const authRoutes = new AuthRoutes();
export default authRoutes.router;