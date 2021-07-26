import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

export interface User extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  lastname: string;
  dni: number;
  email: string;
  password: string;
  last_login: Date;
  sons: any[];
  father: string;
  encryptPassword: (password: string) => string;
  matchPassword: (password: string) => boolean;
};

const UserSchema = new Schema<User>(
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
      type: [mongoose.Schema.Types.ObjectId],
      default: []
    },
    father: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.method("encryptPassword", async function (password): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
});

UserSchema.method("matchPassword", async function (password): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
});

// UserSchema.methods.encryptPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };

// UserSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

export default model<User>("User", UserSchema);