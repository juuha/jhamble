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
        .setDescription(`**${bot.prefix}gamble <amount>** - Ectogambles the declared amount. Amount can be left empty if only gambling once. \n **${bot.prefix}me** - Shows information about yourself.\n **${bot.prefix}buy <amount>** - Used for buying ectos if you have too much gold and too few ectos.\n**${bot.prefix}sell <amount> <what>** - You can sell ectos and orbs if you have too many of those and too little gold. \n**${bot.prefix}give <@who> <amount> <what>** - If your friend has too little of something, you can give them something. (ectos, orbs, gold, jhemonade)\n**${bot.prefix}craft <amount>** - Crafts 1 jhemonade using 50 orbs!\n**${bot.prefix}leaderboard** - Shows the current top ecto gamblers (and you if you aren't in the top 5).\n**${bot.prefix}balance** - Evens out ecto and gold amounts, so they have the same value.\n\n\n**${bot.prefix}roll <amount>** - Rolls an <amount> sided dice and returns the value. If amount is left empty, rolls a 20 sided dice, which has luck based on the server's fortune.\n**${bot.prefix}fortune** - Shows the current fortune of the server.\n**${bot.prefix}curse <amount>** - Cast a curse on the server to alter its fortune. (Empty amount = 1)\n**${bot.prefix}bless <amount>** - Bless the server to alter its fortune. (Empty amount = 1)`)
    try {
        await dm.send(embed)
    } catch (error) { console.error(error) }
}

module.exports.help = {
    name: "help",
    short: "h"
}