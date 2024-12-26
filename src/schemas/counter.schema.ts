import { Schema, Document } from 'mongoose';

export interface Counter extends Document {
  _id: string; // The name of the collection (e.g., 'orders', 'roles')
  seq: number; // The current sequence number
}

export const CounterSchema = new Schema({
  _id: { type: String, required: true }, // Name of the collection
  seq: { type: Number, required: true, default: 0 }, // Sequence number
});
