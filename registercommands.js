const dotenv = require("dotenv");
dotenv.config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const { BOT_ID, GUILD_ID, KEY } = process.env;

const rest = new REST({ version: "10" }).setToken(KEY);
const reg = async (commands) => {
  try {
    console.log("Rejestrowanie");
    await rest.put(Routes.applicationGuildCommands(BOT_ID, GUILD_ID), {
      body: commands,
    });

    console.log("zajebiscie");
  } catch (err) {
    console.log(err);
  }
};

module.exports = reg;
