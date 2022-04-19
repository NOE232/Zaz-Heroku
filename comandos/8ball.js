const Discord = require('discord.js');

module.exports = {
  name: "8ball", 
  alias: [""], 

 execute (client, message, args){

 let texto = args.join(' ')
 if(!texto) return message.channel.send("Debes hacer una pregunta!")

 var cmd= ["Si", "No", "Talvez", "Probablemente"];
 var aleatorioSaludo = Math.floor(Math.random()*(cmd.length));
 const embed = new Discord.MessageEmbed()
 .setTitle(message.author.tag)
 .setColor("RANDOM")
 .setDescription(cmd[aleatorioSaludo]);

 message.channel.send({ embeds: [embed] })

 }

}  