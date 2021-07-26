
import { Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken";

class AuthMiddleware {

    public verifyToken (req: Request, res: Response, next: NextFunction) {
        const bearerHeader =  req.headers['authorization'];
    
        if(typeof bearerHeader !== 'undefined'){
             const token = bearerHeader.split(" ")[1];
             jwt.verify(token, 'secretkey', (error, authData) => {
                if(error){
                    res.sendStatus(403);
                }else{
                    req.authData = authData;
                    next();
                }
            });
        }else{
            res.sendStatus(403);
        }
    }

}

export const authMiddleware = new AuthMiddleware();
