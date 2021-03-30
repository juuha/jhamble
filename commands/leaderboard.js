module.exports.run = async (bot, message, args) => {
    let message_copy = message
    try {
        await message.delete()
    } catch (error) { console.log(error) }
}

module.exports.help = {
    name: "leaderboard",
    short: "l"
}