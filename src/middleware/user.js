import User from "../models/User.js";

export const verifyUserExist = async (req, res, next) => {
    const userAuth = req.authData.user;
    const user = await User.findOne({ dni: userAuth.dni });
    if (user) {
        req.user = user;
        next();
    }else{
        res.send('Error. Usuario no encontrado');
    }
}

export const verifyUserIsAFather = async (req, res, next) => {
    const user = req.user;
    //Si el atributo father es null, es porque es un usuario padre
    if (!user.father) {
        next();
    }else{
        res.send('Accion no permitida para un hijo');
    }
}