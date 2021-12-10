const { Client, Collection, Intents } = require('discord.js');
const Util = require('./Util.js');
const https = require('https');

let url = "https://cdn.rage.mp/master/";


https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            console.log(json);
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});
module.exports = class LaClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone',
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
		});
		this.validate(options);

		this.commands = new Collection();

		this.aliases = new Collection();

		this.utils = new Util(this);

		this.owners = options.owners;

		this.once('ready', () => {
			console.log("\x1b[35m%s\x1b[0m", "[LA]", `Connected to the Discord API successfully. Now logged in.`);
			this.user.setPresence({
				    status: 'online',
    				activities: [
              {
         					 name: 'TEST',
                   type: 'PLAYING'
     					 }
            ]
				});
		});

		this.on('messageCreate', async (message) => {
			const mentionRegex = RegExp(`^<@!${this.user.id}>$`);
			const mentionRegexPrefix = RegExp(`^<@!${this.user.id}> `);

			if (!message.guild || message.author.bot) return;

			if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.prefix}\`.`);

			const prefix = message.content.match(mentionRegexPrefix) ?
				message.content.match(mentionRegexPrefix)[0] : this.prefix;

			if(!message.content.startsWith(prefix)) return;

			// eslint-disable-next-line no-unused-vars
			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

			const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
			if (command) {
				command.run(message, args);
			}
		});
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!options.token) throw new Error('You must pass the token for the client.');
		this.token = options.token;

		if (!options.prefix) throw new Error('You must pass a prefix for the client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of String.');
		this.prefix = options.prefix;
	}

	async start(token = this.token) {
		this.utils.loadCommands();
		super.login(token);
	}

};
