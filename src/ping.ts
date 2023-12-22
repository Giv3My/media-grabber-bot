import * as https from 'https';
import { config } from 'dotenv';

config();

export default () => {
  const req = https.get(process.env.SERVER_URL!, () => {
    console.log('Server was pinged');
  });

  req.on('error', (error) => {
    return error;
  });

  req.end();
};
