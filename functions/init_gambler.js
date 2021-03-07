const fs = require('fs')

module.exports = async (bot, message) => {
    bot.gamblers = require('../gamblers.json')
    if (!bot.gamblers[message.author.id]) {
        bot.gamblers[message.author.id] = {
            id: message.author.id,
            name: message.author.username,
            ecto: 1250,
            gold: 500,
            goo: 0,
            gambles: 0,
            magic_find: 0,
            luck: 0,
            orb: 0,
            mystic_nexus: false,
            mystic_frame: false,
            mystic_forge_node: 0,
            mystic_forge_conduit: false,
            jhemonade: 0
        }
        fs.writeFile('./gamblers.json', JSON.stringify(bot.gamblers, null, 4), async (error) => {
            if (error) console.log(error)
        })
    }
}