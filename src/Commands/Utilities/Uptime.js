const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ut'],
			description: 'This provides the current uptime of the bot.',
			category: 'Utilities'
		});
	}

	async run(message) {
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(`${this.client.user.username} Uptime`, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(this.client.user.displayAvatarURL())
			.setDescription(`My current uptime is:\n ${ms(this.client.uptime, { long: true })}`)
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			return message.channel.send({ embeds: [embed] });
	}
};
