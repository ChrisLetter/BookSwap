import mongoose from 'mongoose';
import { dbName, dbPort } from '../configServer';

mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`);

export default mongoose;
