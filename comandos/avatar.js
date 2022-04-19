const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "avatar", 
  alias: ["Avatar"], 

execute (client, message, args){

 let member = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.member;

 const embed = new Discord.MessageEmbed()
 .setTitle(`Este es el avatar de ${member.displayName}`)
 .setImage(member.user.displayAvatarURL({ size: 1024, format: 'png', dynamic: true}))
 .setColor(member.displayHexColor)
 .setFooter("Hecho Por AndreMor#6220")
 .setTimestamp()

 message.channel.send({ embeds: [embed]})

 }

}  