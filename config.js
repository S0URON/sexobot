import * as dotenv from 'dotenv'
dotenv.config()

console.log(process.env.DISCORD_TOKEN);
export const config = {
    botToken : process.env.DISCORD_TOKEN,
    appID : process.env.DISCORD_APP_ID,
    apiUrl : process.env.API_URL //192.168.1.4
}