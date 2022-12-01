import { SlashCommandBuilder } from "discord.js";
import sendPrivateMessage from "../sendPrivateMessage.js";
import {formatMessage, postArticle} from "../utils/index.js"

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
            .setName("post")
            .setDescription("post an article")
            .addStringOption(option =>
                option.setName('article')
                    .setDescription('the article to post')
                    .setRequired(true)),
        async execute(interaction) {
            const article = await postArticle({});
            if(article) {
                sendPrivateMessage(interaction.client, formatMessage(interaction.user.tag ,interaction.options.getString("article")))
                await interaction.reply("request passed for admin to validate");
            }
            await interaction.reply("sorry, couldn't post the article :/");
        },
    },
];
