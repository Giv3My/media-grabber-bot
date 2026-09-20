import axios from 'axios';
import { config } from 'dotenv';

config();

export default async () => {
  try {
    await axios.get(process.env.SERVER_URL!);
    console.log('Server was pinged');
  } catch (err) {
    return err;
  }
};
