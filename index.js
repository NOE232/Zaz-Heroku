/*
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
*/

// --- Código para subir a replit y UptimeRobot 👆🏻 ---

// --- Inicio del Bot 👇🏻 ---

const fs = require('fs');
require('dotenv').config();

// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	partials: ['MESSAGE', 'CHANNEL'],
});

// Events
console.log('📚 Lista de eventos');
const eventFiles = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}

	console.log(`💾 Evento cargado: ${event.name}`);
}
console.log('');

// Commands
client.commands = new Collection();
console.log('📚 Lista de comandos');
const folder = fs.readdirSync('./commands/');
for (const module of folder) {
	const commandFiles = fs
		.readdirSync(`./commands/${module}`)
		.filter((file) => file.endsWith('.js'));

	console.log(`🧮 Categoría: ${module}`);
	for (const file of commandFiles) {
		const command = require(`./commands/${module}/${file}`);
		// Set a new item in the Collection
		// With the key as the command name and the value as the exported module
		client.commands.set(command.data.name, command);

		console.log(`📖 ${command.data.name} | ${command.data.description}`);
	}
	console.log('');
}


////////////////////////////////// Comandos Preifx XD///////////////////////////////
client.on('messageCreate', async (message) => {

    const db = require('megadb')
    let al = new db.crearDB('antilinks')

    let status = await al.obtener(message.guild.id)

    if(status === 'off') return;

    if(status === 'on'){
        if(message.content.includes('https')){
            if(message.member.permissions.has("ADMINISTRATOR")) return;
            message.delete()
            message.channel.send(`Hey! ${message.author}, los links no estan permitidos!`)
        }
    }
}) // Todo esto va en el index :)

const Discord = require("discord.js")



let { readdirSync } = require('fs') 

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

  console.log('Estoy vivo mamahuevo')


for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
	const time = (1000*5)
  
  let status = [
	[{
	name: `  📖 ${client.guilds.cache.size} Servidores!`,
	type: 'WATCHING'
  }],
  [{
  name: 'En Matenimiendo!',
  type: 'PLAYING'
  }],
	[{
	  name: 'np!help!',
	  type: 'PLAYING'
	}],
	[{
	  name: 'Creador : ! El Osito Nico#6220 y Berny Frankiel#1091',
	  type: 'WATCHING'
	}]
  ]
  setInterval(()=>{
	function randomStatus() {
	let rstatus = status[Math.floor(Math.random() * status.length)];
  client.user.setPresence({ activities: rstatus, status: 'XD' });
	  
  }
   randomStatus();
  }, time )
  
  })



client.on('messageCreate', async (message) => {

  if(message.channel.type === 'dm') return;
  if(message.author.bot) return;

  let prefix = "np!"

  let RegMention = new RegExp(`^<@!?${client.user.id}>( |)$`);

  if (message.content.match(RegMention)) {    const men = new Discord.MessageEmbed()
		.setTitle('Que tal! 🤍')
		.setDescription(`**Mi Prefijo:** \` ${prefix} \`\n**Mira mi lista de comandos:** \` ${prefix}help \``)
		.setColor("RANDOM")
		.setThumbnail(client.user.avatarURL())
		.setFooter({ text: `Solicitado por: ${message.author.tag}` })
  
	  message.channel.send({embeds: [men]})
  
	}

  
  if(!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase()

  if(command === "ping"){
    message.channel.send(`Vivo mamahuevo ${client.ws.ping}ms `)
  }
  if(command === "hola"){
    message.channel.send("Hola Puta")
  }

 let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  if(cmd){
    cmd.execute(client, message, args)
  }
  
})




// Login to Discord with your client's token
client.login(process.env.DISCORD_CLIENT_TOKEN);
