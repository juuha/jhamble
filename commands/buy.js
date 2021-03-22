const init_emojis = require("../functions/init_emojis.js")
const init_gambler = require("../functions/init_gambler.js")
const update_gambler = require("../functions/update_gambler.js")

module.exports.run = async (bot, message, args) => {
    let message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    let what = ""
    let amount = 0
    let error_message = ""

    let gambler = await init_gambler(bot, message_copy.author)
    let emojis = await init_emojis(bot)
    let price = { "ecto": 0.4 }

    if (Number.isInteger(parseInt(args[0]))) {
        amount = parseInt(args[0])
        what = args[1]
        if (amount <= 0) {
            error_message = "Amount can't be less than 1."
        } else {
            if (what) {
                items = ["ecto", "ectos"]
                if (!items.includes(what)) {
                    error_message = `${what} is not for sale!`
                } else {
                    if (what == "ectos") { what = "ecto" }
                    if (gambler.gold < amount * price[what]) {
                        error_message = `${amount} ${emojis[what]} would cost ${amount * price[what]} ${emojis.gold}. You only have ${gambler.gold} ${emojis.gold}.`
                    }
                }
            } else {
                error_message = `Specify what you want to buy!`
            }
        }
    } else {
        error_message = `Usage: ${bot.prefix}buy <amount> ectos`
    }

    if (error_message) {
        try {
            const sent = await message_copy.channel.send(error_message)
            await sent.delete({ timeout: 10000 })
        } catch (error) { console.log(error) }
        return
    }

    gambler[what] += amount
    gambler.gold -= amount * price[what]

    await update_gambler(gambler)

    try {
        const sent = await message_copy.channel.send(`${amount} ${emojis.ecto} bought for ${amount * price[what]} ${emojis.gold}.`)
        await sent.delete({ timeout: 10000 })
    } catch (error) { console.log(error) }
    return
}

module.exports.help = {
    name: "buy",
    short: "b"
}