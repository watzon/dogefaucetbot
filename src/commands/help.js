const { getUsername } = require('../helpers')

const helpMessage = `
Welcome to @TheDogeFaucetBot! I am the official bot for @TheDogeFaucet.

Commands:

/help - Show this message
/setaddress - Sets your DOGE wallet address
/referralcode - Display your referral code
/referralcount - Show how many users you've referred
/referredby [code] - Use another user's referral code

I'm still being actively developed, so if you have any questions or want to report a bug just send a PM to @watzon.
`

module.exports = (bot) => {
  bot.command(['help', 'start'], (ctx) => {
    const username = getUsername(ctx)
    ctx.reply(helpMessage)
  })
}
