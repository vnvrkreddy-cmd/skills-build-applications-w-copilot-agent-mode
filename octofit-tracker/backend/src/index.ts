import express from 'express'
import { connectDatabase } from './config/database.js'
import apiRouter from './routes/api.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(express.json())
app.use('/api', apiRouter)

const start = async () => {
  await connectDatabase()
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`)
  })
}

start().catch((error: unknown) => {
  console.error('Unable to start OctoFit API', error)
  process.exitCode = 1
})
