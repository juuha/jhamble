module.exports.run = async (bot, message, args) => {
    message_copy = message
    try {
        message.delete()
    } catch (error) { console.log(error) }
    let new_message = ""
    let range = parseInt(args[0])

    if (range) {
        if (range > 0) {
            let rng = Math.floor(Math.random() * range) + 1
            new_message = `${message_copy.author.username} rolled ${rng}/${range}!`
        }
    } else {
        let rng = Math.min(20, Math.max(1, Math.floor(Math.random() * 20) + 1 + bot.fortune))

        switch (rng) {
            case 1:
                new_message = `In true RNG fashion, ${message_copy.author.username} rolled a 1/20!`
                break
            case 2:
            case 3:
                new_message = `Ouch! ${message_copy.author.username} rolled a ${rng}/20!`
                break
            case 18:
            case 19:
                new_message = `Woot! ${message_copy.author.username} rolled a ${rng}/20!`
                break
            case 20:
                new_message = `Today is ${message_copy.author.username}'s lucky day! ${message_copy.author.username} rolled a 20/20!`
                break
            default:
                new_message = `${message_copy.author.username} rolled a ${rng}/20!`
        }
    }

    try {
        message_copy.channel.send(new_message)
    } catch (error) { console.log(error) }

}

module.exports.help = {
    name: "roll",
    short: "r"
}