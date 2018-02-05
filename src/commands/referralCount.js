const { User } = require('../models/user')
const { getUsername } = require('../helpers')

module.exports = (bot) => {
  bot.command(['referralCount', 'referralcount'], async (ctx) => {
    const username = getUsername(ctx)

    const tguser = ctx.message.from
    const user = await User.findOne({ tgid: tguser.id })

    const referralCount = user.referralCount
    ctx.reply(`@${tguser.username} your referral count is ${referralCount}`)
  })
}
