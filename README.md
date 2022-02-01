# Jhamble

## A Discord bot made to simulate the Ectoplasm gambling from Guild Wars 2.

The rates of results were estimated using data gathered by the players of the game, which were posted on the Guild Wars 2 wiki. No real money is being used to gamble with this Bot.

A new user gets 5 free rolls worth of gold and ectos and each day they get 1 free roll. As the ecto gambling has a negative gross profit, the free roll is necessary as the users would otherwise run out of gold and ectos almost immediately. There's also a leaderboard to see who has the most ectos and gold. It's just for fun.

## Commands

- %gamble <amount> - Ectogambles the declared amount. Amount can be left empty only gambling once.
- %me - Shows information about yourself.
- %buy <amount> - Used for buying ectos if you have too much gold and too few ectos.
- %sell <amount> <what> - You can sell ectos and orbs if you have too many of those and too little gold.
- %give <@who> <amount> <what> - If your friend has too little of something, you can give them something. (ectos, orbs, gold)

There's also the concept of jhemonade, but it's just an extra incentive for users in my original server. Therefore any mention of %crafting or jhemonade can be ignored if the bot is setup on other servers. In those cases, orbs should be sold for extra gold as they are otherwise just used for crafting jhemonade.

## Setting it up
  
1. Clone the repo.
2. Replace the `<token>` in config.json with your private Discord bot token.
3. If you wish, change the prefix in config.json.
4. Install the dependencies with `npm install`.
5. Run the bot with `node app.js`.
