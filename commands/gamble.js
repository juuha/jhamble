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

const init_gambler = require('../functions/init_gambler.js')

module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    init_gambler(bot, message_copy)

    let ecto_rng = Math.random()
    let gold_rng = Math.random()

    let ecto = ""
    let gold = ""
    if (ecto_rng < 0.345) {
        ecto = '50 Globs of Ectoplasm'
    } else if (ecto_rng < 0.655) {
        ecto = '6 Massive Globs of Ectoplasm (exotic)'
    } else if (ecto_rng < 0.855) {
        ecto = '8 Massive Globs of Ectoplasm (exotic)'
    } else if (ecto_rng < 0.955) {
        ecto = '9 Massive Globs of Ectoplasm (exotic)'
    } else if (ecto_rng < 0.995) {
        ecto = '1 Massive Globs of Ectoplasm (ascended)'
    } else {
        ecto = '5 Massive Globs of Ectoplasm (ascended)'
    }

    if (gold_rng < 0.5765) {
        gold = '25 Chunks of Crystallized Plasma'
    } else if (gold_rng < 0.8265) {
        gold = '150 Chunks of Crystallized Plasma'
    } else if (gold_rng < 0.9265) {
        gold = '200 Chunks of Crystallized Plasma'
    } else if (gold_rng < 0.9765) {
        gold = '250 Chunks of Crystallized Plasma'
    } else if (gold_rng < 0.9965) {
        gold = '5 Orbs of Crystallized Plasma'
    } else if (gold_rng < 0.9995) {
        gold = '10 Orbs of Crystallized Plasma'
    } else {
        gold = '20 Orbs of Crystallized Plasma'
    }
    let new_message = `You win ${ecto} and ${gold}.`
    try {
        message_copy.channel.send(new_message)
    } catch (error) { console.log(error) }
    
}

module.exports.help = {
    name: "gamble"
}