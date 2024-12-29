import { Schema } from 'mongoose';

export const AssetSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    assetTypeId: { type: Number, required: true },
    acquisitionDate: { type: Date, required: true },
    assetDescription: { type: String, required: true },
    assetTag: { type: String, required: true },
    externalAssetCode: { type: String, required: true },
    internalAssetCode: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    sar: { type: Number, required: true },
    userId: { type: Number, required: true },
    assignmentStatus: { type: String, required: true },
    activationStatus: { type: Boolean, required: true },
    assignDate: { type: Date, required: true },
  },
  { timestamps: true },
);
