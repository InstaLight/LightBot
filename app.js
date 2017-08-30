const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json').token;
const ddift = require('return-deep-diff');
const chalk = require('chalk');
require('./util/eventLoader')(client);



client.on('guildMemeberAdd', guild => {
    guild.defaultChannel.send(`Welcome ${member.user.username} to the server!`);
});

client.on('guildMemeberRemove', guild => {
    guild.defaultChannel.send(`Goodbye ${member.user.username} we will miss you!`);
});

client.on('guildMemberUpdate', (oMember, nMember)=> {
    console.log(ddift(oMember, nMember));
})

var reload = (message, cmd) => {
	delete require.cache[require.resolve('./commands/' + cmd)];
	try {
		let cmdFile = require('./commands/' + cmd);
	} catch (err) {
		message.channel.send(`Problem loading ${cmd}: ${err}`).then(
		).catch(error => console.log(error.stack));
	}
	message.channel.send(`${cmd} reload was a success! :white_check_mark:`).then(
	).catch(error => console.log(error.stack));
};
exports.reload = reload;

 client.on('debug', e => {
 });

client.on('warn', e => {
});

client.on('error', e => {
});

client.login(settings);
