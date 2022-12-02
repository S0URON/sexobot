const admins = ["314073451646287875"];
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default async (client, replyText) => {
    for (const admin of admins) {
        try {
            const user = await client.users.fetch(admin);
            const row = new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                    .setCustomId("approve")
                    .setLabel("approve")
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("decline")
                    .setLabel("decline")
                    .setStyle(ButtonStyle.Danger),
            ]);
            await user.send({
                content: replyText,
                components: [row],
            });
        } catch (error) {
            console.log(error);
        }
    }
};
