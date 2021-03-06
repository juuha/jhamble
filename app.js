const Discord = require("discord.js")
const fs = require("fs")
const Config = require("./config.json")

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
})

bot.on("message", async (message) => {
    if (message.partial) await message.fetch()
    if (message.channel.type == "dm" || message.author.bot) return

    if (!message.content.startsWith(bot.prefix)) return
    let msgArray = message.content.split(" ")
    let cmd = msgArray[0]
    let args = msgArray.slice(1)
    let cmd_file = bot.commands.get(cmd.slice(bot.prefix.length))
    if (cmd_file) cmd_file.run(bot, message, args)
})

bot.on("messageReactionAdd", async () => {
    console.log('reaction added');
})

bot.login(Config.token)
