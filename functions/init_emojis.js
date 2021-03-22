const Discord = require('discord.js')

module.exports = async (bot) => {
    let emojis = {}

    emojis.ecto = ":game_die:"
    const ecto_emoji = bot.emojis.cache.find(emoji => emoji.name === 'ecto')
    if (ecto_emoji) emojis.ecto = ecto_emoji
    
    emojis.gold = ":medal:"
    const gold_emoji = bot.emojis.cache.find(emoji => emoji.name === 'gold')
    if (gold_emoji) emojis.gold = gold_emoji

    emojis.orb = ":crystal_ball:"
    const orb_emoji = bot.emojis.cache.find(emoji => emoji.name === "orb")
    if (orb_emoji) emojis.orb = orb_emoji

    emojis.crystal = ":gem:"
    const crystal_emoji = bot.emojis.cache.find(emoji => emoji.name === "crystal")
    if (crystal_emoji) emojis.crystal = crystal_emoji

    emojis.glob = ":low_brightness:"
    const glob_emoji = bot.emojis.cache.find(emoji => emoji.name === "glob")
    if (glob_emoji) emojis.glob = glob_emoji

    emojis.asc_glob = ":high_brightness:"
    const asc_glob_emoji = bot.emojis.cache.find(emoji => emoji.name === "asc_glob")
    if (asc_glob_emoji) emojis.asc_glob = asc_glob_emoji

    return emojis
}
