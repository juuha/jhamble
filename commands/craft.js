const init_emojis = require("../functions/init_emojis")
const init_gambler = require("../functions/init_gambler")
const update_gambler = require("../functions/update_gambler")

module.exports.run = async (bot, message, args) => {
    let message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    let gambler = await init_gambler(bot, message_copy.author)
    let emojis = await init_emojis(bot)

    let count = 1
    let amount = parseInt(args[0])
    let crafts = `Crafted 1 ${emojis.jhemonade}!`
    if (!isNaN(amount)) {
        if (amount >= 1) {
            count = amount
            crafts = `Crafted ${count} ${emojis.jhemonade}!`
        }
    }

    let error_message = ""
    if (gambler.orb < 50 * count) {
        error_message = `You need 50 ${emojis.orb}, but you only have ${gambler.orb} ${emojis.orb}!`
    }

    if (error_message) {
        try {
            const sent = await message_copy.channel.send(error_message)
            await sent.delete({ timeout: 10000 })
        } catch (error) { console.log(error) }
        return
    }

    gambler.orb -= 50 * count
    gambler.jhemonade += 1 * count

    await update_gambler(gambler)

    try {
        const sent = await message_copy.channel.send(crafts)
        await sent.delete({ timeout: 10000 })
    } catch (error) { console.log(error) }
}

module.exports.help = {
    name: "craft",
    short: "c"
}