import {
    SlashCommandBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
} from "discord.js";
import sendPrivateMessage from "../sendPrivateMessage.js";
import {
    createUser,
    findUserByDiscordId,
    formatMessage,
    postArticle,
} from "../utils/index.js";

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
            .addStringOption((option) =>
                option
                    .setName("title")
                    .setDescription("the title to post")
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName("article")
                    .setDescription("the article to post")
                    .setRequired(true)
            ),
        async execute(interaction) {
            try {
                let user = await findUserByDiscordId(interaction.user.id);
                const discordUser = JSON.stringify(interaction.user);
                if (!user) {
                    const newUser = {
                        discordId: interaction.user.id,
                        ...JSON.parse(discordUser),
                    };
                    user = await createUser(newUser);
                }
                const article = await postArticle({
                    sender: user._id,
                    title: interaction.options.getString("title"),
                    content: interaction.options.getString("article"),
                });
                if (article) {
                    await sendPrivateMessage(
                        interaction.client,
                        formatMessage(
                            interaction.user.tag,
                            interaction.options.getString("article"),
                            article._id
                        )
                    );
                    await interaction.reply(
                        "request passed for admin to validate"
                    );
                } else {
                    await interaction.reply(
                        "sorry, couldn't post the article :/"
                    );
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    {
        data: new SlashCommandBuilder()
            .setName("update-color")
            .setDescription("updates specified article color")
            .addStringOption((option) =>
                option
                    .setName("article-id")
                    .setDescription("the article id")
                    .setRequired(true)
            ),
        async execute(interaction) {
            const row = new ActionRowBuilder().addComponents(
                new SelectMenuBuilder()
                    .setCustomId("color")
                    .setPlaceholder("Nothing selected")
                    .addOptions(
                        {
                            label: "black",
                            description: "black color",
                            value: "#000000",
                        },
                        {
                            label: "white",
                            description: "white color",
                            value: "#ffffff",
                        },
                        {
                            label: "light blue",
                            description: "light blue",
                            value: "#E1EBFF",
                        },
                        {
                            label: "dark blue",
                            description: "dark blue",
                            value: "#24427C",
                        },
                        {
                            label: "light green",
                            description: "light green",
                            value: "#E3FFEE",
                        },
                        {
                            label: "dark green",
                            description: "dark green",
                            value: "#2E784B",
                        }
                    )
            );

            await interaction.reply({
                content:
                    "please select the background color for article id=" +
                    interaction.options.getString("article-id") +
                    ":",
                components: [row],
            });
        },
    },
    {
        data: new SlashCommandBuilder()
            .setName("update-text-color")
            .setDescription("updates specified article text color")
            .addStringOption((option) =>
                option
                    .setName("article-id")
                    .setDescription("the article id")
                    .setRequired(true)
            ),
        async execute(interaction) {
            const row = new ActionRowBuilder().addComponents(
                new SelectMenuBuilder()
                    .setCustomId("text-color")
                    .setPlaceholder("Nothing selected")
                    .addOptions(
                        {
                            label: "black",
                            description: "black color",
                            value: "#000000",
                        },
                        {
                            label: "white",
                            description: "white color",
                            value: "#ffffff",
                        }
                    )
            );

            await interaction.reply({
                content:
                    "please select the text color for article id=" +
                    interaction.options.getString("article-id") +
                    ":",
                components: [row],
            });
        },
    },
    {
        data: new SlashCommandBuilder()
            .setName("update-font")
            .setDescription("updates specified article font")
            .addStringOption((option) =>
                option
                    .setName("article-id")
                    .setDescription("the article id")
                    .setRequired(true)
            ),
        async execute(interaction) {
            const row = new ActionRowBuilder().addComponents(
                new SelectMenuBuilder()
                    .setCustomId("font")
                    .setPlaceholder("Nothing selected")
                    .addOptions(
                        {
                            label: "Poppins",
                            description: "font",
                            value: "Poppins",
                        },
                        {
                            label: "Roboto",
                            description: "font",
                            value: "Roboto",
                        },
                        {
                            label: "Inter",
                            description: "font",
                            value: "Inter",
                        }
                    )
            );

            await interaction.reply({
                content:
                    "please select font for article id=" +
                    interaction.options.getString("article-id") +
                    ":",
                components: [row],
            });
        },
    },
];
