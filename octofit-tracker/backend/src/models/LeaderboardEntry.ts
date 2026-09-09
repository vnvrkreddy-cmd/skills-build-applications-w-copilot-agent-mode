import { Schema, model } from 'mongoose'

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true },
  },
  { timestamps: true },
)

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema)
