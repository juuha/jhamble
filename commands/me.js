const Discord = require("discord.js")
const init_emojis = require("../functions/init_emojis.js")
const init_gambler = require('../functions/init_gambler.js')

module.exports.run = async (bot, message) => {
    let message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    init_gambler(bot, message_copy)

    let emojis = await init_emojis(bot)
    
    gambler = bot.gamblers[message_copy.author.id]

    let info = `Gold - ${gambler.gold} \nEctos - ${gambler.ecto}`

    if (gambler.orbs > 0) {
        info += `\nOrbs of Crystallized Plasma - ${gambler.orbs}`
    }
    


    const gambler_id = message_copy.author.id
    const embed = new Discord.MessageEmbed()
        .setTitle(`${emojis.ecto}  ${bot.gamblers[gambler_id].name} ${emojis.ecto}`)
        .setColor(0x9FE2BF)
        .setDescription(info)
    try {
        await message_copy.channel.send(embed)
    } catch (error) { console.log(error) }
}

module.exports.help = {
    name: "me"
}