import { Router } from 'express'

const apiRouter = Router()

apiRouter.get('/', (_request, response) => {
  response.json({
    name: 'octofit-tracker-api',
    version: '1.0.0',
    resources: ['users', 'activities', 'teams', 'leaderboard', 'workouts'],
  })
})

apiRouter.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' })
})

export default apiRouter
