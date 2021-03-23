const init_emojis = require("../functions/init_emojis.js")
const init_gambler = require("../functions/init_gambler.js")
const update_gambler = require("../functions/update_gambler.js")

module.exports.run = async (bot, message, args) => {
    let message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    let amount = parseInt(args[0])
    let error_message = ""

    let gambler = await init_gambler(bot, message_copy.author)
    let emojis = await init_emojis(bot)
    let price = 0.4

    if (amount) {
        if (amount > 0) {
            if (gambler.gold < amount * price) {
                error_message = `${amount} ${emojis.ecto} would cost ${amount * price} ${emojis.gold}. You only have ${gambler.gold} ${emojis.gold}.`
            }
        } else {
            error_message = "Amount can't be less than 1."
        }
    } else {
        error_message = `Usage: ${bot.prefix}buy <amount>`
    }

    if (error_message) {
        try {
            const sent = await message_copy.channel.send(error_message)
            await sent.delete({ timeout: 10000 })
        } catch (error) { console.log(error) }
        return
    }

    gambler.ecto += amount
    gambler.gold -= amount * price

    await update_gambler(gambler)

    try {
        const sent = await message_copy.channel.send(`${amount} ${emojis.ecto} bought for ${amount * price} ${emojis.gold}.`)
        await sent.delete({ timeout: 10000 })
    } catch (error) { console.log(error) }
    return
}

module.exports.help = {
    name: "buy",
    short: "b"
}