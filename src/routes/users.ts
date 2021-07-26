import { Router } from "express";
import { usersController } from '../controllers/UsersController';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { userMiddleware } from '../middleware/UserMiddleware';

class UsersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/api/users/profile', 
            authMiddleware.verifyToken,
            userMiddleware.verifyUserExist, 
            usersController.getProfile
            );
        this.router.put('/api/users/profile', 
            authMiddleware.verifyToken,
            userMiddleware.verifyUserExist, 
            userMiddleware.verifyUserIsAFather, 
            usersController.updateProfile
            );
        this.router.get('/api/users/sons', 
            authMiddleware.verifyToken,
            userMiddleware.verifyUserExist, 
            userMiddleware.verifyUserIsAFather, 
            usersController.getSons
            );
        this.router.post('/api/users/sons', 
            authMiddleware.verifyToken,
            userMiddleware.verifyUserExist, 
            userMiddleware.verifyUserIsAFather, 
            usersController.createSon
            );
        this.router.put('/api/users/sons/:id', 
            authMiddleware.verifyToken,
            userMiddleware.verifyUserExist, 
            userMiddleware.verifyUserIsAFather, 
            usersController.updateSon
            );
        this.router.delete('/api/users/sons/:id', 
            authMiddleware.verifyToken,
            userMiddleware.verifyUserExist, 
            userMiddleware.verifyUserIsAFather, 
            usersController.deleteSon
            );
    }

}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;