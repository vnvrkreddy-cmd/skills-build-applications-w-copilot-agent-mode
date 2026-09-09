import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    grade: { type: Number, required: true, min: 9, max: 12 },
    avatar: { type: String, required: true },
  },
  { timestamps: true },
)

export const User = model('User', userSchema)
