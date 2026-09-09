import { Router } from 'express'
import { Activity } from '../models/Activity.js'
import { LeaderboardEntry } from '../models/LeaderboardEntry.js'
import { Team } from '../models/Team.js'
import { User } from '../models/User.js'
import { Workout } from '../models/Workout.js'
import { apiBaseUrl } from '../config/api.js'

const apiRouter = Router()

apiRouter.get('/', (_request, response) => {
  response.json({
    name: 'octofit-tracker-api',
    version: '1.0.0',
    baseUrl: apiBaseUrl,
    resources: ['users', 'activities', 'teams', 'leaderboard', 'workouts'],
  })
})

apiRouter.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' })
})

apiRouter.get('/users', async (_request, response) => {
  const users = await User.find().sort({ name: 1 }).lean()
  response.json(users)
})

apiRouter.get('/activities', async (_request, response) => {
  const activities = await Activity.find()
    .populate('user', 'name email avatar')
    .sort({ recordedAt: -1 })
    .lean()
  response.json(activities)
})

apiRouter.get('/teams', async (_request, response) => {
  const teams = await Team.find()
    .populate('captain', 'name email avatar')
    .populate('members', 'name email avatar')
    .sort({ name: 1 })
    .lean()
  response.json(teams)
})

apiRouter.get('/leaderboard', async (_request, response) => {
  const entries = await LeaderboardEntry.find()
    .populate('user', 'name email avatar')
    .sort({ rank: 1 })
    .lean()
  response.json(entries)
})

apiRouter.get('/workouts', async (_request, response) => {
  const workouts = await Workout.find().sort({ title: 1 }).lean()
  response.json(workouts)
})

export default apiRouter
