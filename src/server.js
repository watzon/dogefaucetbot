require('dotenv').config()

const Telegraf = require('telegraf')
const mongoose = require('mongoose')
const bot = new Telegraf(process.env.BOT_TOKEN, { username: process.env.BOT_NAME })

// Connect mongoose to mongodb
mongoose.connect(process.env.DB_CONNECTION || 'mongodb://localhost/dogefaucetbot')

bot.use(require('./middleware/createAndUpdateUsers'))

// Load commands
require('./commands')(bot)

bot.startFaucet = require('./faucet').bind(bot)

// bot.startFaucet()
bot.startPolling()
