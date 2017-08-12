const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "Put token here"
const PREFIX = "!"


var fourtunes = [
    "Yes",
    "No",
    "Maybe",
];

var bot = new Discord.Client();

var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
    if(server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

bot.on("ready", function() {
console.log("Ready");
bot.user.setGame("with a light bulb")

});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").send(member.toString() + " Welcome to my Server!");

   member.addRole(member.guild.roles.find("name", "Beginner"));

});

bot.on ("message", function (message) {
if (message.author.equals(bot.user)) return;

if (!message.content.startsWith(PREFIX)) return;

var args = message.content.substring(PREFIX.length).split(" ");

switch (args[0].toLocaleLowerCase()) {
case "ping":
message.channel.send("Pong");
break;
case "info":
message.channel.send("I am a super awesome bot created by yours truely, InstaLight");
break;
case "8ball":
if (args[1]) message.channel.send(fourtunes[Math.floor(Math.random() * fourtunes.length)]);
else message.channel.send("Couldn't read that, try again");
    break;

    case "embed":
var embed = new Discord.RichEmbed()
.addField("Test title 2", "Test description", true)
.addField("Test title 2", "Test description", true)
.addField("Test title 3", "Test description")
message.channel.sendEmbed(embed);
break;

case "help":
message.channel.send("Here are my commands! 1.ping 2.info 3.8ball More commands will come hopefully in the next awesome bot update. If you do anything new, message me on discord IηѕтαLιgнт#0685")
break;

case "test":
message.channel.send("LightBot is switched on!");
break;

case "play":
if (!args[1]) {
    message.channel.send("Please provide a link");
    return
}

if(!message.member.voiceChannel) {
     message.channel.send("You must be in a voice channel");
    return
}

if (!servers[message.guild.id]) servers[message.guild.id] = {
queue: []
};

var server = servers[message.guild.id];

server.queue.push(args[1]);

if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
play(connection, message); 
});
break;

case "skip":
var server = servers[message.guild.id];

if (server.dispatcher) server.dispatcher.end();
break;

case "stop":
var server = servers[message.guild.id];

if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
break;

default:
message.channel.send("You are a dumbo, thats not a command");
}
});

bot.login(TOKEN);