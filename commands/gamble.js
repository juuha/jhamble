/*
gold:
- crystal 25 - 0.5835
- crystal 150 - 0.243 - 0.8265
- crystal 200 - 0.1 - 0.9265
- crystal 250 - 0.05 - 0.9765
- orb 5 - 0.02 - 0.9965
- orb 10 - 0.003 - 0.9995
- orb 20 - 0.0005 - 1
ecto:
- ecto 50 - 0.42
- exotic 6 - 0.245 - 0.655
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

module.exports.run = async (bot, message, args, inside_job = false) => {

    let count = 1
    let gambles = ""
    if (!isNaN(args[0])) {
        if (args[0] > 0) {
            count = args[0]
            gambles = `\nGambled ${args[0]} times!`
        }
        if (args[0] > 25) {
            count = 25
            gambles = `\nMaximum rolls per gamble is 25. Gambled 25 times instead of ${args[0]}!`
        }
    }

    let gambler = {}
    var message_copy = message
    if (inside_job) {
        gambler = await init_gambler(bot, args[1])
    } else {
        try {
            message.delete()
        } catch (error) { console.log(error) }
        gambler = await init_gambler(bot, message_copy.author)
    }

    let emojis = await init_emojis(bot)
    let new_message = ``

    if (gambler.ecto < 250 * count) {
        new_message = `You need at least ${250 * count} ${emojis.ecto}, you have only ${gambler.ecto} ${emojis.ecto}.`
    }

    if (gambler.gold < 100 * count) {
        new_message += `\nYou need at least ${100 * count} ${emojis.gold}, you have only ${gambler.gold} ${emojis.gold}.`
    }

    if (new_message) {
        try {
            const sent = await message_copy.channel.send(new_message)
            await sent.delete({timeout: 10000})
        } catch (error) { console.log(error) }
        return
    }

    gambler.ecto -= 250 * count
    gambler.gold -= 100 * count
    gambler.gambles += 1 * count

    let ecto = ""
    let gold = ""
    let ecto_value = 0
    let gold_value = 0

    for (let loop = 0; loop < count; loop++) {
        let ecto_rng = Math.random()
        let gold_rng = Math.random()

        if (ecto_rng < 0.42) {
            gambler.ecto += 50
            ecto += `50 ${emojis.ecto}`
            ecto_value += 50
        } else if (ecto_rng < 0.655) {
            gambler.ecto += 300
            ecto += `6 ${emojis.glob}`
            ecto_value += 300
        } else if (ecto_rng < 0.855) {
            gambler.ecto += 400
            ecto += `8 ${emojis.glob}`
            ecto_value += 400
        } else if (ecto_rng < 0.955) {
            gambler.ecto += 450
            ecto += `9 ${emojis.glob}`
            ecto_value += 450
        } else if (ecto_rng < 0.995) {
            gambler.ecto += 500
            ecto += `1 ${emojis.asc_glob}`
            ecto_value += 500
        } else {
            gambler.ecto += 2500
            ecto += `5 ${emojis.asc_glob}`
            ecto_value += 2500
        }
        ecto += ", "

        if (gold_rng < 0.5835) {
            gambler.gold += 25
            gold += `25 ${emojis.crystal}`
            gold_value += 25
        } else if (gold_rng < 0.8265) {
            gambler.gold += 150
            gold += `150 ${emojis.crystal}`
            gold_value += 150
        } else if (gold_rng < 0.9265) {
            gambler.gold += 200
            gold += `200 ${emojis.crystal}`
            gold_value += 200
        } else if (gold_rng < 0.9765) {
            gambler.gold += 250
            gold += `250 ${emojis.crystal}`
            gold_value += 250
        } else if (gold_rng < 0.9965) {
            gambler.orbs += 5
            gold += `5 ${emojis.orb}`
            gold_value += 500
        } else if (gold_rng < 0.9995) {
            gambler.orbs += 10
            gold += `10 ${emojis.orb}`
            gold_value += 1000
        } else {
            gambler.orbs += 20
            gold += `20 ${emojis.orb}`
            gold_value += 2000
        }
        gold += ", "
    }

    ecto = ecto.substring(0, ecto.length - 2)
    gold = gold.substring(0, gold.length - 2)

    await update_gambler(bot, gambler)

    const embed = new Discord.MessageEmbed()
        .setTitle(`${emojis.ecto} Ectogamble!`)
        .setColor(0x00FFFF)
        .setDescription(`${gambler.name} receives:\n**${gold}** & **${ecto}**${gambles} Total value: ${gold_value}${emojis.gold} & ${ecto_value}${emojis.ecto}.\n\nCurrent balance: \n**${gambler.gold}** ${emojis.gold} & **${gambler.ecto}** ${emojis.ecto}\n\nReact to gamble again! ${emojis.ecto} = 1 gamble, ${emojis.glob} = 2, ${emojis.crystal} = 5, ${emojis.asc_glob} = 10, ${emojis.orb} = 25`)
    if (inside_job) {
        try {
            message_copy.edit(embed)
        } catch (error) { console.log(error) }
    } else {
        try {
            message_copy.channel.send(embed)
        } catch (error) { console.log(error) }
    }

}

module.exports.help = {
    name: "gamble"
}
