import { Request, Response } from 'express';
import User from "../models/User";
import jwt from "jsonwebtoken";

class AuthController {

  public async singup (req: Request, res: Response) {
    let errors = [];
    const name: string = String(req.query.name);
    const lastname: string = String(req.query.lastname);
    const dni: number = Number(req.query.dni);
    const email: string = String(req.query.email);
    const password: string = String(req.query.password);
    const confirm_password: string = String(req.query.confirm_password);

    if (password != confirm_password) {
      errors.push({ text: "Las claves no coinciden" });
    }
    if (password.length < 4) {
      errors.push({ text: "La contraseña debe ser de almenos 4 caracteres." });
    }
    if (errors.length > 0) {
      res.send(errors);
    } else {
      const user = await User.findOne({ email: email });
      if (user) {
        res.send("Email ya en uso.");
      } else {
        const newUser = new User({ name, lastname, dni, email, password });
        newUser.password = await newUser.encryptPassword(password);
        newUser.save( function (error) {
          if (error) {
            res.send({
              message: "Usuario no registrado.",
              error: error
            });
          } else {
            res.send("Usuario registrado correctamente");
          }
        });
      }
    }
  }
  
  public async singin (req: Request, res: Response) {
    const email: string = String(req.query.email);
    const password: string = String(req.query.password);
    const user = await User.findOne({ email: email });

    if (user) {
      const match = await user.matchPassword(password);
      if (match) {
          jwt.sign({user: user}, 'secretkey', {expiresIn: '3600s'}, (err, token) => {
            res.json({
                  user: user,
                  token: token
              });
          });
        } else {
          res.send("Credenciales incorrectas");
        }
    } else {
      res.send("Credenciales incorrectas");
    }
  }
  
  // public async logout (req: Request, res: Response) {
  //   res.send("Logout");
  // }

}

export const authController = new AuthController();