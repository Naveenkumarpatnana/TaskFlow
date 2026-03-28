import mongoose, { Document, Schema } from 'mongoose';

export enum SprintStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface ISprint extends Document {
  name: string;
  projectKey: string;
  sprintNumber: number;
  startDate?: Date;
  endDate?: Date;
  status: SprintStatus;
  goal?: string;
  createdAt: Date;
  updatedAt: Date;
}

const sprintSchema = new Schema<ISprint>(
  {
    name: {
      type: String,
      required: [true, 'Sprint name is required'],
      trim: true,
    },
    projectKey: {
      type: String,
      default: 'SCRUM',
      trim: true,
    },
    sprintNumber: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(SprintStatus),
      default: SprintStatus.PLANNING,
    },
    goal: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

sprintSchema.index({ status: 1 });
sprintSchema.index({ sprintNumber: 1 });

const Sprint = mongoose.model<ISprint>('Sprint', sprintSchema);

export default Sprint;
