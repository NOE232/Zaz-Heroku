const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "say", 
  alias: ["Say"], 

 execute (client, message, args){

 message.delete()

 let prueba = args.join(' ')
 if(!prueba) return message.channel.send("Debes escribir un mensaje a enviar")

 message.channel.send(prueba)

 }

 }  