const Discord = require("discord.js")
const init_emojis = require("../functions/init_emojis.js")
const init_gambler = require('../functions/init_gambler.js')
const luck_tiers = require("../luck_tiers.json")

module.exports.run = async (bot, message) => {
    let message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    await init_gambler(bot, message_copy.author)

    let emojis = await init_emojis(bot)
    
    gambler = bot.gamblers[message_copy.author.id]
    let info = `Gold ${emojis.gold}: ${gambler.gold}\nEctos ${emojis.ecto}: ${gambler.ecto}`

    info += `\nMagic Find :four_leaf_clover:: ${gambler.luck} \n Luck :chart_with_upwards_trend:: ${gambler.luck}/${luck_tiers[gambler.luck]}` 

    info += `\nTotal gambles: ${gambler.gambles}`

    if (gambler.orb) {
        info += `\nOrbs ${emojis.orb}: ${gambler.orb}`
    }

    if (gambler.goo) {
        info += `\nGoo ${emojis.goo}: ${gambler.goo}`
    }

    if (gambler.jhemonade) {
        info += `\nJhemonade :tropical_drink:: ${gambler.jhemonade}`
    }
    
    if (gambler.mystic_nexus && !gambler.mystic_forge_conduit) {
        info += `\nMystic Nexus :dna:: Acquired!`
    }

    if (gambler.mystic_frame && !gambler.mystic_forge_conduit) {
        info += `\nMystic Frame :film_frames:: Acquired!`
    }

    if (gambler.mystic_forge_node && !gambler.mystic_forge_conduit) {
        info += `\nMystic Forge Node :roll_of_paper:: Acquired!`
    }

    if (gambler.mystic_forge_conduit) {
        info += `\nMystic Forge Conduit :toilet:: Acquired!`
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

module.exports.help = {
    name: "me"
}