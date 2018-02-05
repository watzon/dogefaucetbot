module.exports = (bot) => {
    require('./help')(bot)
    require('./setAddress')(bot),
    require('./referralCode')(bot),
    require('./referralCount')(bot),
    require('./referredBy')(bot)
  }
  