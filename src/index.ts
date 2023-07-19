import { Bot } from './bot';
import { config } from 'dotenv';

config();

const bot = new Bot(process.env.BOT_TOKEN!);

bot.init();
