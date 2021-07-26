import { Request, Response } from 'express';
import UserModel, {User} from '../models/User';

class UsersController {

  public async getProfile (req: Request, res: Response) {
    const user = req.user;
    res.json({ user})
  }

  public async updateProfile (req: Request, res: Response) {
    const user: User = req.user;
    user.name = String(req.query.name);
    user.lastname = String(req.query.lastname);
    user.dni = Number(req.query.dni);

    user.save( function (error) {
      if (error) {
        res.send({
          message: "Usuario no actualizado.",
          error: error
        });
      } else {
        res.send("Usuario actualizado correctamente");
      }
    });
  }

  public async getSons (req: Request, res: Response) {
    const user = req.user;
    if (user.sons.length > 0) {
      let sons = [];
      for (let index = 0; index < user.sons.length; index++) {
        let userSon = await UserModel.findById(user.sons[index]);
        sons.push(userSon);
      }
      res.json({ sons })
    } else {
      res.send('No tiene hijos');
    }
  }

  public async createSon (req: Request, res: Response) {
    const user = req.user;
    const name: string = String(req.query.name);
    const lastname: string = String(req.query.lastname);
    const dni: number = Number(req.query.dni);
    const email: string = String(req.query.email);
    const password: string = String(req.query.password);
    const confirm_password: string = String(req.query.confirm_password);
    let errors = [];

    if (password != confirm_password) {
      errors.push({ text: "Las claves no coinciden" });
    }
    if ( password.length < 4) {
      errors.push({ text: "La contraseña debe ser de almenos 4 caracteres." });
    }
    if (errors.length > 0) {
      res.send(errors);
    } else {
      const userAux = await UserModel.findOne({ email: email });
      if (userAux) {
        res.send("Email ya en uso.");
      } else {
        let father = user._id;
        const newUser = new UserModel({ name, lastname, dni, email, password, father });
        newUser.password = await newUser.encryptPassword(password);
        newUser.save( function (error) {
          if (error) {
            res.send({
              message: "Usuario no registrado.",
              error: error
            });
          } else {
            user.sons.push(newUser._id);
            user.save();
            res.send("Usuario hijo registrado correctamente");
          }
        });
      }
    }
  }

  public async updateSon (req: Request, res: Response) {
    const son_id = req.params.id;
    const user = req.user;

    const result = user.sons.filter(son => son == son_id );
    if (result.length > 0) {
      let userSon = await UserModel.findById(result[0]);
      if (userSon) {
        userSon.name = String(req.query.name);
        userSon.lastname = String(req.query.lastname);
        userSon.dni = Number(req.query.dni);
        userSon.save( function (error) {
          if (error) {
            res.send({
              message: "Usuario no actualizado.",
              error: error
            });
          } else {
            res.send("Usuario hijo actualizado correctamente");
          }
        });
      }
    } else {
      res.send("Error. No puede actualizar usuario porque no es su hijo");
    }
  }

  public async deleteSon (req: Request, res: Response) {
    const user = req.user;
    const son_id = req.params.id;
    const result = user.sons.filter(son => son == son_id );
    if (result.length > 0) {
      UserModel.findByIdAndRemove(son_id);
      user.sons = user.sons.filter(son => son != son_id );
      user.save();
      res.send("Usuario hijo eliminado correctamente");
    } else {
      res.send("Error. No puede eliminar usuario porque no es su hijo");
    }
  }

}

export const usersController = new UsersController();
