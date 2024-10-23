import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITodo extends Document {
  userId: string;
  task: string;
  status: string;
  desc: string;
  createdAt: Date;
}

const TodoSchema: Schema<ITodo> = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  task: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  desc: { type: String },
  createdAt: { type: Date},
});

const Todo: Model<ITodo> = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);
export default Todo;
