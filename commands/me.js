const Discord = require("discord.js")
const init_emojis = require("../functions/init_emojis.js")
const init_gambler = require('../functions/init_gambler.js')

module.exports.run = async (bot, message) => {
    let message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    await init_gambler(bot, message_copy.author)

    let emojis = await init_emojis(bot)
    
    gambler = bot.gamblers[message_copy.author.id]
    let info = `Gold ${emojis.gold}: ${gambler.gold}\nEctos ${emojis.ecto}: ${gambler.ecto}`

    let today = Math.floor(Date.now() / 86400000)
    if (gambler.free < today) {
        info += `\nFree gamble: Available now!`
    } else {
        let tomorrow = (today + 1) * 86400000
        let time_remaining = msToTime(tomorrow - Date.now())
        info += `\nFree gamble: Available in ${time_remaining}!`
    }

    info += `\nTotal gambles: ${gambler.gambles}`

    if (gambler.orb) {
        info += `\nOrbs ${emojis.orb}: ${gambler.orb}`
    }

    if (gambler.jhemonade) {
        info += `\nJhemonade ${emojis.jhemonade}: ${gambler.jhemonade}`
    }

    const gambler_id = message_copy.author.id
    const embed = new Discord.MessageEmbed()
        .setTitle(`${bot.gamblers[gambler_id].name} ${emojis.ecto}`)
        .setColor(0x9FE2BF)
        .setDescription(info)
    try {
        await message_copy.channel.send(embed)
    } catch (error) { console.log(error) }
}

function msToTime(duration) {
    let minutes = Math.floor((duration / (1000 * 60)) % 60)
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    let total = ""
    if (hours) { 
        if (hours == 1) {
            total +=  "1  hour " 
        } else {
            total += hours + " hours " 
        }
    }
    if (minutes == 1) {
        total += "1 minute"
    } else {
        total += minutes + " minutes"
    }

    return total;
}

module.exports.help = {
    name: "me"
}