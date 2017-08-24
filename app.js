const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./settings.json').token;
const ddift = require('return-deep-diff');

client.on('ready',() => {
	console.log('I\'m Online\nI\'m Online');
});

//guild events

client.on('guildDelete', guild => {
    console.log(`I have left ${guild.name} at ${new Date()}`);
});

client.on('guildCreate', guild => {
    guild.defaultChannel.send(`I have joined ${guild.name}`);
});

client.on('guildMemeberAdd', guild => {
    guild.defaultChannel.send(`Welcome ${member.user.username} to the server!`);
});

client.on('guildMemeberRemove', guild => {
    guild.defaultChannel.send(`Goodbye ${member.user.username} we will miss you!`);
});

client.on('guildMemberUpdate', (oMember, nMember)=> {
    console.log(ddift(oMember, nMember));
})

client.on('guildUpdate', (oGuild, nGuild)=> {
    console.log(ddift(oGuild, nGuild));
})

//guild events

//client events



//client events

//commands
var prefix = "!"
client.on('message', message => {
	let args = message.content.split(' ').slice(1);
	var result = args.join(' ');

	if (!message.content.startsWith(prefix)) return;
	if (message.author.bot) return;

	if (message.content.startsWith(prefix + 'ping')) {
		message.channel.sendMessage(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
	} else

	if (message.content.startsWith(prefix + 'send')) {
		client.channels.get('245491978601627648').send('Hello from the bot testing channel!');
	} else

	if (message.content.startsWith(prefix + 'setgame')) {
		if (!result) {
			result = null;
		}
		client.user.setPresence(result);
	} else

	if (message.content.startsWith(prefix + 'setstatus')) {
		if (!result) {
			result = 'online';
		}
		client.user.setStatus(result);
	} else

	if (message.content.startsWith(prefix + 'foo')) {
		message.channel.sendMessage('bar');
	}
});
//commands
client.login(token);
