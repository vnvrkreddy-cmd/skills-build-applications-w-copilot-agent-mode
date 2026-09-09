import { Router } from 'express'
import { Activity } from '../models/Activity.js'
import { User } from '../models/User.js'
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

export default apiRouter
