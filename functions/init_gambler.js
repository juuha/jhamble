const fs = require('fs')

module.exports = async (bot, gambler) => {
    bot.gamblers = require('../gamblers.json')
    if (!bot.gamblers[gambler.id]) {
        bot.gamblers[gambler.id] = {
            id: gambler.id,
            name: gambler.username,
            ecto: 1250,
            gold: 500,
            gambles: 0,
            orb: 0,
            mystic_nexus: false,
            mystic_frame: false,
            mystic_forge_node: false,
            mystic_forge_conduit: false,
            jhemonade: 0
        }
        fs.writeFile('./gamblers.json', JSON.stringify(bot.gamblers, null, 4), async (error) => {
            if (error) console.log(error)
        })
    }
    return bot.gamblers[gambler.id]
}
