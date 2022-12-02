import { REST, Routes } from 'discord.js';
import { config } from './config.js';
import localCommands from './commands/commands.js';

const commands = localCommands.map(command => command.data.toJSON());
console.log("slm :",config.botToken)
const rest = new REST({ version: '10' }).setToken(config.botToken);
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
            Routes.applicationCommands(config.appID),
            { body: commands },
        );

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
