import mongoose from 'mongoose'
import { connectDatabase } from '../config/database.js'
import { Activity } from '../models/Activity.js'
import { LeaderboardEntry } from '../models/LeaderboardEntry.js'
import { Team } from '../models/Team.js'
import { User } from '../models/User.js'
import { Workout } from '../models/Workout.js'

async function seedDatabase() {
  try {
    await connectDatabase()

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.create([
      { name: 'Alex Rivera', email: 'alex.rivera@mergington.edu', grade: 10, avatar: 'AR' },
      { name: 'Jordan Lee', email: 'jordan.lee@mergington.edu', grade: 11, avatar: 'JL' },
      { name: 'Taylor Morgan', email: 'taylor.morgan@mergington.edu', grade: 9, avatar: 'TM' },
    ])

    const teams = await Team.create([
      { name: 'Peak Performers', color: '#ff6b35', captain: users[0]._id, members: [users[0]._id, users[1]._id] },
      { name: 'Steady Striders', color: '#2878a8', captain: users[2]._id, members: [users[2]._id] },
    ])

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 32, points: 64, recordedAt: new Date('2026-09-08T16:30:00Z') },
      { user: users[1]._id, type: 'strength', durationMinutes: 40, points: 80, recordedAt: new Date('2026-09-08T15:45:00Z') },
      { user: users[2]._id, type: 'walking', durationMinutes: 28, points: 28, recordedAt: new Date('2026-09-07T17:15:00Z') },
    ])

    await LeaderboardEntry.create([
      { user: users[0]._id, points: 420, rank: 1, period: '2026-09' },
      { user: users[1]._id, points: 365, rank: 2, period: '2026-09' },
      { user: users[2]._id, points: 290, rank: 3, period: '2026-09' },
    ])

    await Workout.create([
      { title: 'After-School 5K Prep', description: 'A progressive run and recovery session for building endurance.', category: 'cardio', difficulty: 'intermediate', durationMinutes: 35, targetGrade: 10 },
      { title: 'Core Builder', description: 'A focused bodyweight routine for balance and core strength.', category: 'strength', difficulty: 'beginner', durationMinutes: 20, targetGrade: 9 },
      { title: 'Post-Practice Reset', description: 'Gentle mobility work to support recovery after team practice.', category: 'mobility', difficulty: 'beginner', durationMinutes: 15, targetGrade: 11 },
    ])

    console.log(`Database seeding complete: ${users.length} users, ${teams.length} teams`)
  } catch (error: unknown) {
    console.error('Error seeding database:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

void seedDatabase()
