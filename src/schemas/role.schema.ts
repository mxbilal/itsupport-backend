import { model, Schema, Document } from 'mongoose';

// ToolSchema definition
export const ToolSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  isInternal: { type: Boolean, required: true },
});

// RoleSchema definition
export const RoleSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  cost: { type: String },
  isActive: { type: Boolean, required: true },
  tools: { type: [ToolSchema], required: false },
});
