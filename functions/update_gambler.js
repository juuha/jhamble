module.exports = async (bot, gambler) => {
    bot.gamblers = require('../gamblers.json')
    bot.gamblers[gambler.id] = gambler
    fs.writeFile('./gamblers.json', JSON.stringify(bot.gamblers, null, 4), async (error) => {
        if (error) console.log(error)
    })
}
