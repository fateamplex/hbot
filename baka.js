//Import modules
const Discord = require('discord.js');
const chalk = require('chalk');
const snekfetch = require('snekfetch');

const fs = require('fs');
const { bot } = require("./bot.json");

//Client configuration
const client = new Discord.Client();
const prefix = "^";
const token = "ODI5MzkwMDU2Mzc5OTA4MTM4.YG3brg.OIlDbDKBPcZBNsVt0k31IKoxcxI";

//Client Message Variables
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.categories = fs.readdirSync('./Commands/');

//Connect the engine to the Bot (if you could say so)ö
['Engine'].forEach(engine => {
    require(`./${engine}`)(client); 
});

//Client events

//on ready
client.once("ready", () =>{
    console.log(chalk.yellow("----------------------------------------------------"));
    console.log(chalk.blue(`Logged in as ${client.user.tag}`));
    console.log(chalk.yellow("----------------------------------------------------"));
    console.log(chalk.blue("Using FakaEngine v.2"));
    console.log("Developed by: Fakado#0002");
    console.log(chalk.yellow("----------------------------------------------------"));
    console.log(chalk.red(chalk.bold("Warning! FakaEngine is not released for public use. This engine is only for Fakado and no one else!")))
    console.log(chalk.yellow("----------------------------------------------------"));
    console.log(chalk.yellow("----------------------------------------------------"));
    console.log(chalk.green("Loaded modules: "));
    console.log(chalk.blue("- discord.js \n- chalk"));
    console.log(chalk.red("-------------Bot Logs Start Here-------------"));
    client.user.setActivity("The only hentai bot you need!");
});


//on message 
client.on('message', message => {
    let prefix = bot.prefix;
    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = message.guild.fetchMember(message);

    //Args setup 
    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command) command.run(client, message, args);

});


client.login(token);