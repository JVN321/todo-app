import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  userId: string;
  username: string;
  password: string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
