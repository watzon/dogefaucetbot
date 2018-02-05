const { User } = require('../models/user')
const { getUsername } = require('../helpers')

module.exports = async (ctx, next) => {
  if (ctx.message) {
    const tguser = ctx.message.from
    const username = getUsername(ctx)
    User.findOne({ tgid: tguser.id }).then(async (user) => {
      if (user) {
        if (username !== user.username) {
          user.username = username
          try {
            await user.save()
          } catch (e) {
            console.error(`Failed to update username for '${username}': ${e}`)
          }
        }
      } else {
        try {
          await User.create({
            tgid: tguser.id,
            username: username
          })
        } catch (e) {
          console.error(`Failed to add user '${username}: ${e}'`)
        }
      }
    }).catch(e => {
      console.error(e)
    })
  }
  await next()
}
