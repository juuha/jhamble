module.exports.run = async (bot, message, args) => {
    let message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    let amount = parseInt(args[0]) ? parseInt(args[0]) : 1

    let prophecy = message_copy.content.slice(1)
    let new_message = ""
    if (prophecy.startsWith("bless")) {
        bot.fortune = Math.min(20, bot.fortune + amount)
        new_message = ":innocent::pray:"
    } else {
        bot.fortune = Math.max(1, bot.fortune - amount)
        new_message = ":smiling_imp::fire:"
    }
    try {
        const sent = await message_copy.channel.send(new_message)
        await sent.delete({ timeout: 3000 })
    } catch (error) { console.log(error) }
}

module.exports.help = {
    bless: "bless",
    curse: "curse"
}