const Discord = require("discord.js")
const init_gambler = require('../functions/init_gambler.js')

module.exports.run = async (bot, message) => {
    let message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    init_gambler(bot, message_copy)

    let emoji = ":game_die:"
    const ecto_emoji = bot.emojis.cache.find(emoji => emoji.name === 'ecto')
    if (ecto_emoji) emoji = ecto_emoji
    
    gambler = bot.gamblers[message_copy.author.id]
    
    let info = ''


    const gambler_id = message_copy.author.id
    const embed = new Discord.MessageEmbed()
        .setTitle(`${emoji}  ${bot.gamblers[gambler_id].name} ${emoji}`)
        .setColor(0x9FE2BF)
        .setDescription(info)
    try {
        await message_copy.channel.send(embed)
    } catch (error) { console.log(error) }
}

module.exports.help = {
    name: "me"
}