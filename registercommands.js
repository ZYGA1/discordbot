const dotenv = require('dotenv')
dotenv.config()
const {REST, Routes} = require('discord.js')

const commands = [
    {
        name: 'dis',
        description: 'jebac disa',
    },
    {
        name: 'pogoda',
        description: 'pogoda',
    },
]

const rest = new REST({ version: '10' })
rest.setToken(process.env.KEY)
const reg = async () => {
    try {
        console.log("Rejestrowanie")

        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        
        console.log("zajebiscie")
    } catch(err) {
        console.log(err)
    }
}

reg();