module.exports.run = async (bot, message, args) => {
    let message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }

    let prophecy = message_copy.content.slice(1)
    let new_message = ""
    if (prophecy == "bless") {
        bot.fortune = Math.min(20, bot.fortune + 1)
        new_message = ":innocent::pray:"
    } else {
        bot.fortune = Math.max(1, bot.fortune - 1)
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