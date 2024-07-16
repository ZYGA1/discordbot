const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mathew")
    .setDescription("jebanie mathewa"),

  execute: async (interaction) => {
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.member.nickname} jebie mathewa`)
      .setImage(
        "https://th.bing.com/th/id/R.d786da2ec6bfacc6b066f7b80a5e5228?rik=pT24zl1SBLKJtw&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2016%2f12%2fWild-Boar-Wallpapers-HD.jpg&ehk=St5F6QW35D4yqym5OJMKuH628SEHq%2fVpHaq0FKRyasU%3d&risl=&pid=ImgRaw&r=0"
      );

    await interaction.reply({ embeds: [embed] });
  },
};
