import mongoose, { Document, Schema, Model } from "mongoose";
import { passwordEncrypt } from "../utils/common";

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    required: true,
    set: passwordEncrypt,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPassToken: String,
  resetPassExpiresAt: Date,
  verificationToken: {
    type: String,
    default: () => Math.floor(100000 + Math.random() * 900000).toString()  // 6 digit code
  },
  verificationTokenExpiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours later
  }
}, {
  collection: 'users',
  timestamps: true
});


const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;

export interface IUser extends Document {
  username: string;
  avatar: string;
  password: string;
  email: string;
  isVerified: boolean;
  resetPassToken?: string;
  resetPassExpiresAt?: Date;
  verificationToken: string;
  verificationTokenExpiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
