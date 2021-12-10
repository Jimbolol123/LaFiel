const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
var bot = require('../../../package.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['bi'],
			description: 'This provides the basic information about Zester!',
			category: 'Utilities'
		});
	}

	async run(message) {
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(`${this.client.user.username} Information`, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(this.client.user.displayAvatarURL())
			.addField(`Bot Name:`, `${this.client.user.username}`, true)
      .addField(`Bot ID:`, `${this.client.user.id}`, true)
      .addField(`Bot Version:`, `${bot.version}`, true)
      .addField(`Bot Developer:`, `<@857009926123421727>`, true)
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			return message.channel.send({ embeds: [embed] });
	}
};
