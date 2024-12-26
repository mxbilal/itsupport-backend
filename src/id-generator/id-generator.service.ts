import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter } from '../schemas/counter.schema';

@Injectable()
export class IdGeneratorService {
  constructor(
    @InjectModel('Counter') private readonly counterModel: Model<Counter>,
  ) {}

  async getNextId(collectionName: string): Promise<number> {
    const counter = await this.counterModel.findOneAndUpdate(
      { _id: collectionName }, // Use the collection name as the ID
      { $inc: { seq: 1 } }, // Increment the sequence number
      { new: true, upsert: true }, // Create a new document if not found
    );
    return counter.seq;
  }
}
