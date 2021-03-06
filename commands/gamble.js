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
*/


module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    ecto_rng = Math.random()
    gold_rng = Math.random()

    ecto = ""
    gold = ""
    if (ecto_rng < 0.345) {
        ecto = 'ecto 50'
    } else if (ecto_rng < 0.655) {
        ecto = 'exo 6'
    } else if (ecto_rng < 0.855) {
        ecto = 'exo 8'
    } else if (ecto_rng < 0.955) {
        ecto = 'exo 9'
    } else if (ecto_rng < 0.995) {
        ecto = 'asc 1'
    } else {
        ecto = 'asc 5'
    }

    if (gold_rng < 0.5765) {
        gold = 'crystal 25'
    } else if (gold_rng < 0.8265) {
        gold = 'crystal 150'
    } else if (gold_rng < 0.9265) {
        gold = 'crystal 200'
    } else if (gold_rng < 0.9765) {
        gold = 'crystal 250'
    } else if (gold_rng < 0.9965) {
        gold = 'orb 5'
    } else if (gold_rng < 0.9995) {
        gold = 'orb 10'
    } else {
        gold = 'orb 20'
    }
    new_message = `You win ${ecto} and ${gold}.`
    try {
        message_copy.channel.send(new_message)
    } catch (error) { console.log(error) }
    
}

module.exports.help = {
    name: "gamble"
}