/*
gold:
- crystal 25 - 0.5765
- crystal 150 - 0.25 - 0.8265
- crystal 200 - 0.1 - 0.9265
- crystal 250 - 0.05 - 0.9765
- orb 5 - 0.02 - 0.9965
- orb 10 - 0.003 - 0.9995
- orb 20 - 0.0005 - 1
ecto:
- ecto 50 - 0.345
- exotic 6 - 0.31 - 0.655
- exotic 8 - 0.2 - 0.855
- exotic 9 - 0.1 - 0.955
- asc 1 - 0.04 - 0.995
- asc 5 - 0.005  - 1
goo: 0.07
*/

const Discord = require("discord.js")
const init_gambler = require('../functions/init_gambler.js')
const update_gambler = require('../functions/update_gambler.js')
const init_emojis = require("../functions/init_emojis.js")

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    let gambler = await init_gambler(bot, message_copy)

    let new_message = ``

    let emojis = await init_emojis(bot)

    if (gambler.ecto < 250) {
        new_message = `You need at least 250 ${emojis.ecto}, you have only ${gambler.ecto} ${emojis.ecto}.`
    }

    if (gambler.gold < 100) {
        new_message += `\nYou need at least 100 ${emojis.gold}, you have only ${gambler.gold} ${emojis.gold}.`
    }

    if (new_message) {
        try {
            message_copy.channel.send(new_message)
        } catch (error) { console.log(error) }
        return
    }

    gambler.ecto -= 250
    gambler.gold -= 100
    gambler.gambles += 1

    let ecto_rng = Math.random()
    let gold_rng = Math.random()

    let ecto = ""
    let gold = ""
    if (ecto_rng < 0.345) {
        gambler.ecto += 50
        ecto = `50 ${emojis.ecto}`
    } else if (ecto_rng < 0.655) {
        gambler.ecto += 300
        ecto = `6 ${emojis.glob}`
    } else if (ecto_rng < 0.855) {
        gambler.ecto += 400
        ecto = `8 ${emojis.glob}`
    } else if (ecto_rng < 0.955) {
        gambler.ecto += 450
        ecto = `9 ${emojis.glob}`
    } else if (ecto_rng < 0.995) {
        gambler.ecto += 500
        ecto = `1 ${emojis.asc_glob}`
    } else {
        gambler.ecto += 2500
        ecto = `5 ${emojis.asc_glob}`
    }

    if (gold_rng < 0.5765) {
        gambler.gold += 25
        gold = `25 ${emojis.crystal}`
    } else if (gold_rng < 0.8265) {
        gambler.gold += 150
        gold = `150 ${emojis.crystal}`
    } else if (gold_rng < 0.9265) {
        gambler.gold += 200
        gold = `200 ${emojis.crystal}`
    } else if (gold_rng < 0.9765) {
        gambler.gold += 250
        gold = `250 ${emojis.crystal}`
    } else if (gold_rng < 0.9965) {
        gambler.orbs += 5
        gold = `5 ${emojis.orb}`
    } else if (gold_rng < 0.9995) {
        gambler.orbs += 10
        gold = `10 ${emojis.orb}`
    } else {
        gambler.orbs += 20
        gold = `20 ${emojis.orb}`
    }

    await update_gambler(bot, gambler)

    const embed = new Discord.MessageEmbed()
        .setTitle(`${emojis.ecto} Ectogamble!`)
        .setColor(0x00FFFF)
        .setDescription(`${gambler.name} receives:\n**${gold}** & **${ecto}**\n\nCurrent balance: \n**${gambler.gold}** ${emojis.gold} & **${gambler.ecto}** ${emojis.ecto}\n\nReact with ${emojis.ecto} to gamble again!`)

    try {
        message_copy.channel.send(embed)
    } catch (error) { console.log(error) }
    
}

module.exports.help = {
    name: "gamble"
}
