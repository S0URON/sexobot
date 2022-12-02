import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import { config } from "./config.js";
import localCommands from "./commands/commands.js";
import { validateArticle, updateStyle } from "./utils/index.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const encoded = "TVRBME56a3hPVGd3T0RnMk5UTTNPRE01TlEuRy1BUnk5LjNPVE00MmJCN1RkVmhJQXQzOWRlNEFIWl9aWlJUWmVyaTBpVEJF"
client.commands = new Collection();

for (const command of localCommands)
    client.commands.set(command.data.name, command);

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isSelectMenu()) {
        let articleId = interaction.message.content
            .split("id=")[1]
            .split(":")[0];
        let approveResult = false;
        switch (interaction.component.customId) {
            case "color":
                approveResult = await updateStyle(articleId, {
                    backgoundColor: interaction.values[0],
                    textColor: null,
                    textFont: null,
                });
                break;
            case "text-color":
                approveResult = await updateStyle(articleId, {
                    backgoundColor: null,
                    textColor: interaction.values[0],
                    textFont: null,
                });
                break;
            case "font":
                approveResult = await updateStyle(articleId, {
                    backgoundColor: null,
                    textColor: null,
                    textFont: interaction.values[0],
                });
                break;
            default:
                break;
        }
        if (approveResult) {
            await interaction.reply("article status updated");
        } else {
            await interaction.reply("couldn't update article style");
        }
    }
    if (interaction.isButton()) {
        let articleId = "";
        let approveResult = false;
        switch (interaction.component.customId) {
            case "approve":
                articleId = interaction.message.content
                    .split("id=")[1]
                    .split(":")[0];
                approveResult = await validateArticle(articleId, "APPROVED");
                break;
            case "decline":
                articleId = interaction.message.content
                    .split("id=")[1]
                    .split(":")[0];
                approveResult = await validateArticle(articleId, "DECLINED");
                break;
            default:
                break;
        }
        if (approveResult) {
            await interaction.reply("article status updated");
        } else {
            await interaction.reply("couldn't update article status");
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

client.login(Buffer.from(encoded, 'base64').toString('ascii'));
