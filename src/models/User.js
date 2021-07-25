import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'User name required'], 
    },
    lastname: { 
      type: String, 
      required: [true, 'User lastname required'], 
    },
    dni: { 
      type: Number, 
      required: [true, 'User dni required'], 
      unique: [true, 'User dni must be unique'],
    },
    email: { 
      type: String, 
      required: [true, 'User email required'],
      unique: [true, 'User email must be unique'],
    },
    password: { 
      type: String, 
      required: [true, 'User password required'] 
    },
    last_login: { 
      type: Date, 
      default: Date.now 
    },
    sons: { 
      type: [mongoose.ObjectId],
      default: []
    },
    father: {
      type: mongoose.ObjectId,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default model("User", UserSchema);