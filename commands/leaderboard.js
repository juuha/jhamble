const Discord = require("discord.js")
const init_emojis = require("../functions/init_emojis")
const init_gambler = require("../functions/init_gambler")
const gamblers = require('../gamblers.json')

module.exports.run = async (bot, message, args) => {
    let message_copy = message
    try {
        await message.delete()
    } catch (error) { console.log(error) }

    let gambler = await init_gambler(bot, message_copy.author)
    let leaderboard = []

    for (let id in gamblers) {
        let g = gamblers[id]
        leaderboard.push({ name: g.name, gold: g.gold, ecto: g.ecto, orb: g.orb, value: g.gold + g.ecto * 0.4 + g.orb * 100 })
        console.log(g.gold + g.ecto * 0.4 + g.orb * 100)
    }
    console.log(leaderboard.sort((a, b) => (a.value < b.value) ? 1 : -1))
    let max = Math.min(5, leaderboard.length)

    let rank = leaderboard.findIndex(g => g.name === gambler.name) + 1
    let emojis = await init_emojis(bot)
    let names = ""
    let items = ""
    let total_value = ""

    for (let i = 0; i < max; i++) {
        let g = leaderboard[i]
        names += `${i + 1}.\u2800${g.name}\n`
        items += `${g.gold}${emojis.gold}\u2800${g.ecto}${emojis.ecto}\u2800${g.orb}${emojis.orb}\n`
        total_value += `${g.value}${emojis.gold}\n`
    }

    if (rank > max + 1) {
        names += `...\n${rank}.\u2800${gambler.name}`
        items += `\n${gambler.gold}${emojis.gold}\u2800${gambler.ecto}${emojis.ecto}\u2800${gambler.orb}${emojis.orb}`
        total_value += `\n${gambler.gold + gambler.ecto * 0.4 + gambler.orb * 100}${emojis.gold}`
    }

    const embed = new Discord.MessageEmbed()
        .setTitle(`${emojis.ecto} Leaderboard ${emojis.ecto}`)
        .addFields(
            { name: 'Name', value: names, inline: true },
            { name: `Gold, ectos and orbs`, value: items, inline: true },
            { name: 'Total value', value: total_value, inline: true },
        )
        .setColor(0xffd700)

    try {
        message_copy.channel.send(embed)
    } catch (error) { console.log(error) }
}

module.exports.help = {
    name: "leaderboard",
    short: "l"
}