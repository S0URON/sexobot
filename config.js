import * as dotenv from 'dotenv'
dotenv.config()

console.log(process.env.DISCORD_TOKEN);
export const config = {
    botToken : process.env.DISCORD_TOKEN,
    appID : process.env.DISCORD_APP_ID,
    apiUrl : "http://192.168.1.4:60004"
}