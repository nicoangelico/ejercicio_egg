import { Request, Response, NextFunction} from 'express';
import UserModel from '../models/User';

class UserMiddleware {
    
    public async verifyUserExist (req: Request, res: Response, next: NextFunction) {
        const userAuth = req.authData.user;
        const user = await UserModel.findOne({ dni: userAuth.dni });
        if (user) {
            req.user = user;
            next();
        }else{
            res.send('Error. Usuario no encontrado');
        }
    }
    
    public async verifyUserIsAFather (req: Request, res: Response, next: NextFunction) {
        const user = req.user;
        //Si el atributo father es null, es porque es un usuario padre
        if (!user.father) {
            next();
        }else{
            res.send('Accion no permitida para un hijo');
        }
    }

}

export const userMiddleware = new UserMiddleware();