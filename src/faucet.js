const { User } = require('./models/user')
const { weightedRandom } = require('./helpers')
const BlockIo = require('block_io')

const TIME_DELAY = .1
const MIN_PAYOUT = 2
const MAX_PAYOUT = 200
const BIAS = 5.375
const CHANNEL = process.env.CHANNEL_NAME

const block_io = new BlockIo(process.env.BLOCK_IO_API_KEY, process.env.BLOCK_IO_SECRET_PIN, 2)
const block_io_address = process.env.BLOCK_IO_ADDRESS

const runFaucet = async function () {
    const count = await User.count().exec()
    const rand = Math.floor(Math.random() * count)
    const user = await User.findOne().skip(rand).exec()

    const walletAddress = user.walletAddress

    if (!walletAddress) {
        console.log(this)
        this.telegram.sendMessage(user.tgid, `You were selected to win free DOGE, but didn't have a wallet address saved. Add your wallet address with /addwallet so that you can have another chance!`)
    } else {
        const amount = weightedRandom(MIN_PAYOUT, MAX_PAYOUT, BIAS)
        block_io.withdraw_from_labels({
            amounts: amount,
            from_labels: 'tgfaucetbot',
            to_addresses: walletAddress
        }, (err) => {
            if (err) {
                console.error(err.message)
            } else {
                this.telegram.sendMessage(CHANNEL_NAME, `@${user.username} won ${amount} DOGE!`)
            }
        })
    }

    const sf = startFaucet.bind(this)
    sf()
}

const startFaucet = function () {
    const bot = this
    setTimeout(runFaucet.bind(bot), TIME_DELAY * 60 * 1000)
}

module.exports = startFaucet