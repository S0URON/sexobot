import { SlashCommandBuilder } from "discord.js";

export default [
    {
        data: new SlashCommandBuilder()
            .setName("test")
            .setDescription("Replies with bot is working"),
        async execute(interaction) {
            await interaction.reply("bot is working!");
        },
    },
    {
        data: new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Replies pong"),
        async execute(interaction) {
            console.log(JSON.stringify(interaction.user, null, 4));
            await interaction.reply(JSON.stringify(interaction.user));
        },
    },
];
