import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const singup = async (req, res) => {
  let errors = [];
  const { name, lastname, dni, email, password, confirm_password } = req.query;
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
};

export const singin = async (req, res) => {
  const { email, password } = req.query;
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
};

export const logout = (req, res) => {
  res.send("logout");
  // req.logout();
  // req.flash("success_msg", "You are logged out now.");
  // res.redirect("/users/signin");
};
