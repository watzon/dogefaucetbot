const randomstring = require('randomstring')
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  tgid: String,
  username: String,
  walletAddress: String,
  timesWon: Number,
  referralCode: String,
  referralCount: String,
  referredBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

userSchema.methods.incrementReferralCount = async function () {
  this.referralCount++
  await this.save()
}

userSchema.methods.incrementTimesWon = async function () {
  this.timesWon++
  await this.save()
}

userSchema.pre('save', function (next) {
  // Generate a referral code if one isn't set
  if (!this.referralCode) {
    this.referralCode = randomstring.generate({ length: 8, readable: true })
    this.referralCount = 0
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = {
  userSchema,
  User
}
