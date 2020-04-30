import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  _id: string;
  name: string;
  gender: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);
