import { SlashCommandBuilder } from "discord.js";
import sendPrivateMessage from "../sendPrivateMessage.js";

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
            sendPrivateMessage(interaction.client, interaction.member ,"a request was sent by " + interaction.user.tag)
            await interaction.reply("pong");
        },
    },
];
