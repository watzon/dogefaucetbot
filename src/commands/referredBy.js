const { User } = require('../models/user')
const { getUsername } = require('../helpers')

module.exports = (bot) => bot.command(['referredBy', 'referredby'], async (ctx) => {
  const fromUser = ctx.message.from
  const referralCode = ctx.message.text.split(' ')[1]

  const username = getUsername(ctx)

  // Send a message if no referral code was included
  if (!referralCode) {
    return ctx.reply('I need a referral code for whoever referred you.\nLike this: /referredby TDhdhvEs')
  }

  const referredUser = await User.findOne({ tgid: fromUser.id })
  const referredByUser = await User.findOne({ referral_code: referralCode })

  // Make sure the referral code matches a user
  if (!referredByUser) {
    return ctx.reply(`A user with that referral code doesn't exist. Are you sure you got it right?`)
  }

  // Keep people from using their own referral code
  if (referredUser.id == referredByUser.id) {
    return ctx.reply(`Sorry, but you can't use your own referral code.`)
  }

  // Make sure they don't try to add another referral
  if (referredUser.referredBy) {
    return ctx.reply('You can only be referred by one user.')
  }

  referredUser.referredBy = referredByUser
  await referredUser.save()

  await referredByUser.incrementReferralCount()

  ctx.reply(`Thank you @${referredByUser.username} for referring @${referredUser.username}`)
})
