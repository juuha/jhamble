const init_emojis = require("../functions/init_emojis")
const init_gambler = require("../functions/init_gambler")
const update_gambler = require("../functions/update_gambler")

module.exports.run = async (bot, message, args, inside_job) => {
    let message_copy = message
    let gambler = {}
    if (inside_job) {
        gambler = await init_gambler(bot, args[0])
    } else {
        try {
            message.delete()
        } catch (error) { console.log(error) }
        gambler = await init_gambler(bot, message_copy.author)
    }
    let emojis = await init_emojis(bot)
    let ecto = gambler.ecto

    let total = gambler.gold + gambler.ecto * 0.4
    let uneven_ectos = total / (2 * 0.4)
    let even = Math.ceil(uneven_ectos / 5) * 5
    let diff = uneven_ectos - even

    gambler.gold = (total / 2) + (diff * 0.4)
    gambler.ecto = even

    let delta_ecto = gambler.ecto - ecto
    let new_message = ""

    await update_gambler(gambler)

    if (delta_ecto < 0) {
        new_message = `Sold ${-1 * delta_ecto}${emojis.ecto} for ${-0.4 * delta_ecto}${emojis.gold}! You now have ${gambler.gold}${emojis.gold} and ${gambler.ecto}${emojis.ecto}.`
    } else if (delta_ecto > 0) {
        new_message = `Bought ${delta_ecto}${emojis.ecto} for ${0.4 * delta_ecto}${emojis.gold}! You now have ${gambler.gold}${emojis.gold} and ${gambler.ecto}${emojis.ecto}.`
    } else {
        new_message = "Already perfectly balanced, as all things should be."
    }

    try {
        let sent = await message_copy.channel.send(new_message)
        try {
            sent.delete({ timeout: 10000 })
        } catch (error) { console.log(error) }
    } catch (error) { console.log(error) }
}

module.exports.help = {
    name: "balance",
    short: "bal",
    alt: "even"
}