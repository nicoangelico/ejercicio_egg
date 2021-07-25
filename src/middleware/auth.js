
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
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