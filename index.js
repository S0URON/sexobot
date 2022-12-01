import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import { config } from "./config.js";
import localCommands from "./commands/commands.js";
import sendPrivateMessage from "./sendPrivateMessage.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for (const command of localCommands)
    client.commands.set(command.data.name, command);

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isButton()) {
        //interaction.reply(interaction.component.customId)
        switch (interaction.component.customId) {
            case "approve":
                console.log(interaction.message);
                break;
            case "decline":
                break;
            default:
                break;
        }
    }

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
});

client.login(config.botToken);
