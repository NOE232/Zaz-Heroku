const Discord = require('discord.js');
const db = require('megadb')
let al = new db.crearDB('antilinks')

module.exports = {
	name: "antilinks",
	alias: [],

async execute (client, message, args){

  if(!message.member.permissions.has("ADMINISTRATOR"))return message.reply("No tienes los permisos suficientes! :pensive:\nPermisos faltantes : `ADMINISTRATOR`")

  if(!al.tiene(message.guild.id)){
      al.establecer(message.guild.id, 'off')
  }

  if(!args[0]){
      const inicio = new Discord.MessageEmbed()
      .setTitle('Bienvenido al sistema antilinks!')
      .setDescription('**Para establecer el estado de el antilinks escribe `antilinks off` / `antilinks on`**')
      .addField('Estado actual del antilinks :', `**\`${await al.obtener(message.guild.id)}\`**`)
      .setColor('#ff78cf')
      message.reply({ embeds: [inicio] })
  }

  if(args[0] === 'on'){
      const active = new Discord.MessageEmbed()
    .setTitle('Antilinks Activado')
    .setDescription('**De ahora en adelante los links seran prohibidos!**')
    .setColor('GREEN')
    al.establecer(message.guild.id, 'on')
    message.reply({ embeds: [active] })
  }

  if(args[0] === 'off'){
    const active = new Discord.MessageEmbed()
  .setTitle('Antilinks Desactivado')
  .setDescription('**Los links estan permitidos nuevamente!**')
  .setColor('RED')
  al.establecer(message.guild.id, 'off')
  message.reply({ embeds: [active] })
}

  }
	
}
