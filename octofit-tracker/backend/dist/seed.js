"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("./models/User");
const Team_1 = require("./models/Team");
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Workout_1 = require("./models/Workout");
dotenv_1.default.config();
async function seed() {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        User_1.User.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Activity_1.Activity.deleteMany({}),
        Leaderboard_1.Leaderboard.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    const users = await User_1.User.create([
        { name: 'Ada', email: 'ada@example.com', role: 'admin' },
        { name: 'Ben', email: 'ben@example.com', role: 'member' },
    ]);
    const teams = await Team_1.Team.create([
        { name: 'Velocity', description: 'Endurance team' },
        { name: 'Momentum', description: 'Strength team' },
    ]);
    await Activity_1.Activity.create([
        { userId: users[0]._id.toString(), type: 'run', duration: 30, date: new Date() },
        { userId: users[1]._id.toString(), type: 'strength', duration: 45, date: new Date() },
    ]);
    await Leaderboard_1.Leaderboard.create([
        { userId: users[0]._id.toString(), score: 95, rank: 1 },
        { userId: users[1]._id.toString(), score: 88, rank: 2 },
    ]);
    await Workout_1.Workout.create([
        { name: 'HIIT Circuit', description: 'Fast intervals', difficulty: 'intermediate' },
        { name: 'Core Flow', description: 'Mobility and core', difficulty: 'beginner' },
    ]);
    console.log('Seed data loaded for octofit_db');
    await mongoose_1.default.disconnect();
}
seed().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
