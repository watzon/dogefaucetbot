const { User } = require('../models/user')
const { getUsername } = require('../helpers')

module.exports = (bot) => {
  bot.command(['referralCode', 'referralcode'], async (ctx) => {
    const username = getUsername(ctx)

    const tguser = ctx.message.from
    const user = await User.findOne({ tgid: tguser.id })

    const referralCode = user.referralCode
    ctx.reply(`@${tguser.username} your referral code is ${referralCode}\n\nUse it to refer your friends to @TheDogeFaucet and get DOGE rewards! 🎉`)
  })
}
