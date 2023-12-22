import express from 'express';
import cron from 'node-cron';
import { Bot } from './bot';
import ping from './ping';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (_, res) => {
  res.send(process.env.SERVER_URL);
});

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`);
  });

  const bot = new Bot(process.env.BOT_TOKEN!);
  bot.bot.createWebhook({ domain: 'web.telegram.org' });

  bot.init();
};

start();

cron.schedule('* * * * *', () => {
  ping();
});
