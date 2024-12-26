import { Schema } from 'mongoose';

export const UserGroupSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  cost: { type: String },
  isActive: { type: Boolean, required: true },
});
