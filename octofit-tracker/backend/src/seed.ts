import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectToDatabase } from './database';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

dotenv.config();

async function seed() {
  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Ada', email: 'ada@example.com', role: 'admin' },
    { name: 'Ben', email: 'ben@example.com', role: 'member' },
  ]);

  const teams = await Team.create([
    { name: 'Velocity', description: 'Endurance team' },
    { name: 'Momentum', description: 'Strength team' },
  ]);

  await Activity.create([
    { userId: users[0]._id.toString(), type: 'run', duration: 30, date: new Date() },
    { userId: users[1]._id.toString(), type: 'strength', duration: 45, date: new Date() },
  ]);

  await Leaderboard.create([
    { userId: users[0]._id.toString(), score: 95, rank: 1 },
    { userId: users[1]._id.toString(), score: 88, rank: 2 },
  ]);

  await Workout.create([
    { name: 'HIIT Circuit', description: 'Fast intervals', difficulty: 'intermediate' },
    { name: 'Core Flow', description: 'Mobility and core', difficulty: 'beginner' },
  ]);

  console.log('Seed data loaded for octofit_db');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
