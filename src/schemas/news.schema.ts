import { Schema } from 'mongoose';

export const NewsSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, required: true },
    newsFile: { type: Buffer },
  },
  { timestamps: true },
);
