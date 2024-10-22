import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITodo extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  task: string;
  status: string;
  desc: string;
  createdAt: Date;
}

const TodoSchema: Schema<ITodo> = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  desc: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Todo: Model<ITodo> = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);
export default Todo;
