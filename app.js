const Discord = require("discord.js")
const fs = require("fs")
const Config = require("./config.json")
const init_emojis = require("./functions/init_emojis")

const bot = new Discord.Client({
    disableEveryone: true,
    partials: ['MESSAGE', 'REACTION']
})

bot.commands = new Discord.Collection()

fs.readdir("./commands/", (error, files) => {
    if (error) console.log(error)
    let jsfiles = files.filter(file => file.split(".").pop() == "js")
    if (jsfiles.length == 0) return
    for (const jsfile of jsfiles) {
        let props = require(`./commands/${jsfile}`)
        for (const key in props.help) {
            bot.commands.set(props.help[key], props)
        }
    }
})

bot.on('error', err => console.log(err))

bot.on("ready", async () => {
    console.log(`The name's Jhamble, ready to gamble!`)
    bot.prefix = Config.prefix
    bot.fortune = 0
})

bot.on("message", async (message) => {
    if (message.partial) await message.fetch()
    if (message.channel.type == "dm") return
    if (message.author === bot.user && message.embeds.length > 0) {
        if (message.embeds[0].color == 0x9FE2BF || message.embeds[0].color == 0xff7f7f) {
            const emojis = await init_emojis(bot)
            try {
                await message.react(emojis.ecto)
                await message.react(emojis.glob)
                await message.react(emojis.crystal)
                await message.react(emojis.asc_glob)
                await message.react(emojis.orb)
                await message.react(emojis.balance)
            } catch (error) { console.log(error) }
            return
        }
    }

    if (!message.content.startsWith(bot.prefix)) return
    let msgArray = message.content.split(" ")
    let cmd = msgArray[0]
    let args = msgArray.slice(1)
    let cmd_file = bot.commands.get(cmd.slice(bot.prefix.length))
    if (cmd_file) cmd_file.run(bot, message, args)
})

bot.on("messageReactionAdd", async (messageReaction, user) => {
    if (messageReaction.message.partial) {
        try {
            await messageReaction.message.fetch()
        } catch (error) { console.error(error) }
        for (const [id, reaction] of messageReaction.message.reactions.cache) {
            try {
                await reaction.users.fetch()
            } catch (error) { console.error(error) }
        }
    }
    if (user === bot.user) return
    const { message } = messageReaction
    const emojis = await init_emojis(bot)
    if (message.author === bot.user) {
        if (message.embeds[0].color == 0x9FE2BF || message.embeds[0].color == 0xff7f7f) {
            let count = 1
            let command = "gamble"
            if (messageReaction.emoji === emojis.ecto) {
                count = 1
            } else if (messageReaction.emoji === emojis.glob) {
                count = 2
            } else if (messageReaction.emoji === emojis.crystal) {
                count = 5
            } else if (messageReaction.emoji === emojis.asc_glob) {
                count = 10
            } else if (messageReaction.emoji === emojis.orb) {
                count = 25
            } else if (messageReaction.emoji.name) {
                if (messageReaction.emoji.name === emojis.balance) {
                    command = "balance"
                }
            } else {
                return
            }
            let real_username = message.embeds[0].description.split("\n")[0]
            real_username = real_username.substring(0, real_username.length - 10)
            const reactionUserManager = messageReaction.users
            try {
                await reactionUserManager.remove(user)
            } catch (error) { console.log(error) }
            if (user.username == real_username) {
                switch (command) {
                    case "gamble":
                        bot.commands.get('gamble').run(bot, message, [count, user], true)
                        break
                    case "balance":
                        bot.commands.get('balance').run(bot, message, [user], true)
                        break
                }
            }


        }
    }
})

bot.login(Config.token)
