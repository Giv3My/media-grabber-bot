import express from 'express';
import { Bot } from './bot';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 5000;
const app = express();

app.head('/', (_, res) => {
  res.send(process.env.SERVER_URL);
});

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`);
  });

  const bot = new Bot(process.env.BOT_TOKEN!);

  bot.init();
};

start();
