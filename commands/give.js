const init_emojis = require('../functions/init_emojis')
const init_gambler = require('../functions/init_gambler')
const update_gambler = require('../functions/update_gambler')
const gamblers = require('../gamblers.json')

module.exports.run = async (bot, message, args) => {
    let message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    let gambler = await init_gambler(bot, message_copy.author)
    let emojis = await init_emojis(bot)

    let who = args[0]
    let amount = parseInt(args[1])
    let what = args[2]

    let error_message = ``

    let user = getUserFromMention(bot, who)
    let receiver = {}

    if (user) {
        if (gamblers[user.id]) {
            receiver = gamblers[user.id]
        } else {
            receiver = await init_gambler(bot, user)
        }
    } else {
        error_message += `\nMention user with @ infront. For example @Jhem`
    }

    if (isNaN(amount)) {
        error_message += `\nAmount has to be a number!`
    } else if (amount < 1) (
        error_message += "\nAmount has to be positive, you thief!"
    )

    let given_item = ""
    if (what) {
        switch (what) {
            case "orbs":
            case "orb": {
                given_item = "orb"
                break
            }
            case "ecto":
            case "ectos": {
                given_item = "ecto"
                break
            }
            case "gold":
            case "golds": {
                given_item = "gold"
                break
            }
            case "jhemonade":
            case "jhemonades":
                given_item = "jhemonade"
                break
            default: {
                error_message += `\nYou can only give ectos, gold, orbs or jhemonade.`
            }
        }
    } else {
        error_message += `\nYou have to specify what you want to give! (ectos, orbs, gold, jhemonade)`
    }

    if (gambler[given_item] < amount) {
        error_message += `\nYou can't give what you don't have! You only have ${gambler[given_item]} ${emojis[given_item]}!`
    }

    if (error_message) {
        try {
            const sent = await message_copy.channel.send(`Usage: ${bot.prefix}give <@who> <amount> <what>\n` + error_message)
            await sent.delete({ timeout: 20000 })
        } catch (error) { console.log(error) }
        return
    }

    gambler[given_item] -= amount
    receiver[given_item] += amount

    await update_gambler(gambler)
    await update_gambler(receiver)

    let success_message = `${gambler.name} gave ${receiver.name} ${amount} ${emojis[given_item]}!`
    try {
        sent = await message_copy.channel.send(success_message)
    } catch (error) { console.log(error) }

}

function getUserFromMention(bot, mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return bot.users.cache.get(mention);
    }
}

module.exports.help = {
    name: "give",
    short: "g"
}