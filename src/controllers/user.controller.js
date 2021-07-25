import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const user = req.user;
  res.json({ user})
};

export const updateProfile = async (req, res) => {
  const user = req.user;
  const { name, lastname, dni } = req.query;
  user.name = name;
  user.lastname = lastname;
  user.dni = dni;
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
};

export const getSons = async (req, res) => {
  const user = req.user;
  if (user.sons.length > 0) {
    let sons = [];
    for (let index = 0; index < user.sons.length; index++) {
      let userSon = await User.findById(user.sons[index]);
      sons.push(userSon);
    }
    res.json({ sons })
  } else {
    res.send('No tiene hijos');
  }
};

export const createSon = async (req, res) => {
  const user = req.user;
  const { name, lastname, dni, email, password, confirm_password } = req.query;
  let errors = [];

  if (password != confirm_password) {
    errors.push({ text: "Las claves no coinciden" });
  }
  if (password.length < 4) {
    errors.push({ text: "La contraseña debe ser de almenos 4 caracteres." });
  }
  if (errors.length > 0) {
    res.send(errors);
  } else {
    const userAux = await User.findOne({ email: email });
    if (userAux) {
      res.send("Email ya en uso.");
    } else {
      let father = user._id;
      const newUser = new User({ name, lastname, dni, email, password, father });
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

};

export const updateSon = async (req, res) => {
  const { name, lastname, dni } = req.query;
  const son_id = req.params.id;
  const user = req.user;

  const result = user.sons.filter(son => son == son_id );
  if (result.length > 0) {
    let userSon = await User.findById(result[0]);
    userSon.name = name;
    userSon.lastname = lastname;
    userSon.dni = dni;
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
  } else {
    res.send("Error. No puede actualizar usuario porque no es su hijo");
  }
};

export const deleteSon = async (req, res) => {
  const user = req.user;
  const son_id = req.params.id;
  const result = user.sons.filter(son => son == son_id );
  if (result.length > 0) {
    User.findByIdAndRemove(son_id);
    user.sons = user.sons.filter(son => son != son_id );
    user.save();
    res.send("Usuario hijo eliminado correctamente");
  } else {
    res.send("Error. No puede eliminar usuario porque no es su hijo");
  }
};
