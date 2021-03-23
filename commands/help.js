const Discord = require("discord.js")

module.exports.run = async (bot, message) => {
    let message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    var dm = await message_copy.author.createDM()
    const embed = new Discord.MessageEmbed()
        .setTitle(`The name's Jhamble, ready to gamble!`)
        .setColor(0xFF0000)
        .setDescription(`**${bot.prefix}gamble <amount>** - Ectogambles the declared amount. Amount can be left empty if only gambling once. \n **${bot.prefix}me** - Shows information about yourself.\n **${bot.prefix}buy <amount>** - Used for buying ectos if you have too much gold and too few ectos.\n**${bot.prefix}sell <amount> <what>** - You can sell ectos and orbs if you have too many of those and too little gold. \n**${bot.prefix}give <@who> <amount> <what>** - If your friend has too little of something, you can give them something. (ectos, orbs, gold, jhemonade)\n**${bot.prefix}craft <amount>** - Crafts 1 jhemonade using 50 orbs!\n\n Give Jhem a jhemonade for a free ecto gamble in gw2.`)
    try {
        await dm.send(embed)
    } catch (error) { console.error(error) }
}

module.exports.help = {
    name: "help",
    short: "h"
}