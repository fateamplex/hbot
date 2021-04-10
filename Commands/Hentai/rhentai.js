const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
    name: 'rhentai',
    aliases: ['rh', 'reddithentai'],
    category: 'Hentai',
    description: "Show's you hentai from r/hentai [Random]",
    run: async(client, message, args) => {
        try{
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/hentai.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh hentai!, Try again later maybe??');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(allowed[randomnumber].data.title)
        .setImage(allowed[randomnumber].data.url)
        .setFooter("Hentai from r/hentai")
        message.channel.send(embed)
    } catch (err) {
        return console.log(err);
    }
    }
}