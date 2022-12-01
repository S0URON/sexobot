import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
    botToken : process.env.DISCORD_TOKEN,
    appID : process.env.DISCORD_APP_ID
}