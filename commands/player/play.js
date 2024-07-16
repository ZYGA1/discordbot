const { SlashCommandBuilder } = require("discord.js");


const command = new SlashCommandBuilder()
.setName('play')
.setDescription('play')
.addStringOption(option => option.setName('link').setDescription('link'))


module.exports = {
    client: true,
    data: command,

    execute: async (interaction, client) => {
        const link = interaction.options.getString('link')


        console.log(client)
    }
}
