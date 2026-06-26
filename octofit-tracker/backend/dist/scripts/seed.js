"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../database");
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
dotenv_1.default.config();
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        User_1.User.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Activity_1.Activity.deleteMany({}),
        Leaderboard_1.Leaderboard.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    const users = await User_1.User.create([
        { name: 'Ada Chen', email: 'ada.chen@example.com', role: 'admin' },
        { name: 'Ben Ortiz', email: 'ben.ortiz@example.com', role: 'member' },
        { name: 'Chloe Rivera', email: 'chloe.rivera@example.com', role: 'coach' },
    ]);
    const teams = await Team_1.Team.create([
        { name: 'Velocity', description: 'A high-energy endurance team focused on marathons and cycling.' },
        { name: 'Momentum', description: 'A strength and conditioning squad for powerlifting and sprints.' },
    ]);
    await Activity_1.Activity.create([
        { userId: users[0]._id.toString(), type: 'run', duration: 42, date: new Date('2026-06-20T06:30:00.000Z') },
        { userId: users[1]._id.toString(), type: 'strength', duration: 55, date: new Date('2026-06-21T18:00:00.000Z') },
        { userId: users[2]._id.toString(), type: 'yoga', duration: 35, date: new Date('2026-06-22T07:15:00.000Z') },
    ]);
    await Leaderboard_1.Leaderboard.create([
        { userId: users[0]._id.toString(), score: 975, rank: 1 },
        { userId: users[1]._id.toString(), score: 912, rank: 2 },
        { userId: users[2]._id.toString(), score: 903, rank: 3 },
    ]);
    await Workout_1.Workout.create([
        { name: 'HIIT Circuit', description: 'A 25-minute interval routine that mixes burpees, jumps, and core work.', difficulty: 'intermediate' },
        { name: 'Core Flow', description: 'A mobility-based session centered on balance, stretching, and posture.', difficulty: 'beginner' },
        { name: 'Power Builder', description: 'A strength workout focused on squats, deadlifts, and presses.', difficulty: 'advanced' },
    ]);
    console.log('Seed completed successfully');
    await mongoose_1.default.disconnect();
}
seed().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
