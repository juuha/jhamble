module.exports.run = async (bot, message, args) => {
    message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    let fortune = ""
    switch (true) {
        case bot.fortune <= -16:
            fortune = "Everything is wrong, the end is upon us!"
            break
        case bot.fortune < -10:
            fortune = "A chill runs down your spine!"
            break
        case bot.fortune < -3:
            fortune = "There is an unsettling feeling in the air!"
            break
        case bot.fortune == 0:
            fortune = "I don't think it could be more normal than this!"
            break
        case bot.fortune >= 16:
            fortune = "Everything is going right, the future is bright!"
            break
        case bot.fortune > 10:
            fortune = "Today is a great day!"
            break
        case bot.fortune > 3:
            fortune = "Today is hopeful!"
            break
        default:
            fortune = "Everything seems normal!"
    }
    try {
        const sent = message_copy.channel.send(fortune)
        await sent.delete({ timeout: 10000 })
    } catch (error) { console.log(error) }
}

module.exports.help = {
    name: "fortune",
    short: "f",
    cookie: "cookie"
}