const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['halp'],
			description: 'Displays all the commands in the bot',
			category: 'Utilities',
			usage: '[command]'
		});
	}

	async run(message, [command]) {
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(`${message.guild.name} Help Menu`, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(this.client.user.displayAvatarURL())
			.setDescription(`For a list of Zester commands or additional support, please visit our website! Or, you may join our Zester support server for any questions. \n https://zesterbot.com/commands \n https://discord.gg/RXwPUETQ2E`)
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			message.channel.send({ embeds: [embed] })
	}

};
