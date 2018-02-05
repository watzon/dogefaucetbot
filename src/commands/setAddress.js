const { User } = require('../models/user')

module.exports = (bot) => {
    bot.command(['setAddress', 'setaddress'], async (ctx) => {
        const address = ctx.message.text.split(' ')[1]
        const tguser = ctx.message.from
        const user = await User.findOne({ tgid: tguser.id })

        if (!address) {
            return ctx.reply('So disappoint. No address.')
        }

        user.walletAddress = address
        await user.save()

        return ctx.reply('So wow. Address saved.')
    })
}