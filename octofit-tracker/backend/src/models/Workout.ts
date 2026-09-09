import { Schema, model } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['cardio', 'strength', 'mobility'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetGrade: { type: Number, required: true, min: 9, max: 12 },
  },
  { timestamps: true },
)

export const Workout = model('Workout', workoutSchema)
