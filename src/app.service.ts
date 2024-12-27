import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ResponseUtil } from './utils/response.util';

@Injectable()
export class AppService {
  private readonly mongoUri = process.env.MONGO_URL;
  private readonly dbName = 'Itsupport';

  getHello(): string {
    return 'Hello World!';
  }

  async getToolsDropdownItems(): Promise<any> {
    const client = new MongoClient(this.mongoUri);

    try {
      await client.connect();
      console.log(this.dbName, this.mongoUri);
      const db = client.db(this.dbName);
      const collection = db.collection('lyca_tools');
      // Fetch all items for the dropdown
      const items = await collection.find().toArray();

      return ResponseUtil.success('Data Found successfully', items);
    } catch (error) {
      console.error('Error fetching dropdown items:', error);
      return ResponseUtil.error('Something went wrong', error);
    } finally {
      await client.close();
    }
  }

  async getCountryDropdownItems(): Promise<any> {
    const client = new MongoClient(this.mongoUri);
    try {
      await client.connect();
      console.log(this.dbName, this.mongoUri);
      const db = client.db(this.dbName);
      const collection = db.collection('country');
      const items = await collection.find().toArray();

      return ResponseUtil.success('Data Found successfully', items);
    } catch (error) {
      console.error('Error fetching dropdown items:', error);
      return ResponseUtil.error('Something went wrong', error);
    } finally {
      await client.close();
    }
  }
}
