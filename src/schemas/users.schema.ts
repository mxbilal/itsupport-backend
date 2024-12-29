import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    id: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    initial: { type: String, required: true },
    roleId: { type: Number, required: true },
    active: { type: Boolean, default: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    userGroupId: { type: Number, required: true },
    countryId: { type: Number, required: true, default: 1 },
    dateOfJoining: { type: Date, default: null },
    dateOfLeaving: { type: Date, default: null },
    lockupBudget: { type: String, default: '0' },
    archivingBudget: { type: String, default: '0' },
    utilizationBudget: { type: String, default: '0' },
    missingTimesheetBudget: { type: String, default: '3' },
  },
  { timestamps: true },
);
