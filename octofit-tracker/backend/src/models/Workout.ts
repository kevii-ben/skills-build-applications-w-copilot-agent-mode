import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  difficulty: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  difficulty: { type: String, default: 'beginner' },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
