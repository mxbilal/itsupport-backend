import { Schema } from 'mongoose';

export const ToolSchema = new Schema({
  id: { type: Number, required: true }, // ID of the tool
  name: { type: String, required: true }, // Name of the tool
  url: { type: String, required: true }, // URL of the tool
  isInternal: { type: Boolean, required: true }, // Whether the tool is internal
});

export const RoleSchema = new Schema({
  id: { type: Number, required: true }, // ID of the role
  name: { type: String, required: true }, // Name of the role
  cost: { type: String }, // Cost associated with the role
  isActive: { type: Boolean, required: true }, // Role active status
  tools: { type: [ToolSchema], required: false }, // Array of assigned tools
});
