import { Schema } from 'mongoose';

export const AssetTypeSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});
