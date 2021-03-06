/*
gold:
- crystal 25 - 0.5765
- crystal 150 - 0.25
- crystal 200 - 0.1
- crystal 250 - 0 .05
- orb 5 - 0.02
- orb 10 - 0.003
- orb 20 - 0.0005
ecto:
- ecto 50 - 0.345
- exotic 6 - 0.31
- exotic 8 - 0.2
- exotic 9 - 0.1
- asc 1 - 0.04
- asc 5 - 0.005 
*/


module.exports.run = async (bot, message, args) => {
    var message_copy = message
    try {
        message.delete()
    } catch (error) { console.error(error) }

    
}

module.exports.help = {
    name: "gamble"
}