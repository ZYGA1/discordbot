const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pogoda")
    .setDescription("pogoda")
    .addStringOption((option) =>
      option.setName("miasto").setDescription("miasto")
    ),

  execute: async (interaction) => {
    const key = process.env.WEATHER_KEY;
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
    const city = interaction.options.getString("miasto");

    const URL = baseUrl + "q=" + city + "&appid=" + key;

    await fetch(URL)
      .then((result) => result.json())
      .then((data) => {
        console.log(data);

        const embed = new EmbedBuilder()
          .setTitle(`Pogoda ${data.name}`)
          .setDescription(
            `Temperatura: ${(data.main.temp - 273.15).toFixed(1)} C \n Ciśnienie: ${data.main.pressure} hPa`
          )
          .setTimestamp()
          

        interaction.reply({ embeds: [embed] });
      })
      .catch((err) => interaction.reply("Złe miasto"));
  },
};
