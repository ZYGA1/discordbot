const dotenv = require("dotenv");
const { exec } = require("child_process");
const { unlink } = require("fs");
dotenv.config();
const path = require("path");

const { KEY } = process.env;
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildModeration,
  ],
});

client.once("ready", () => {
  console.log(`${client.user.username} sigma`);
});

client.on("messageCreate", (message) => {
  console.log(message.author.username, message.content);

  if (message.author.bot) return;

  if (message.content == ".") {
    const key = process.env.WEATHER_KEY;
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
    const city = "Ostroleka";

    const URL = baseUrl + "q=" + city + "&appid=" + key;

    fetch(URL)
      .then((result) => result.json())
      .then((data) => console.log(Math.round(data.main.temp - 273.15)));

    message.reply("KYS");
  }

  if (message.content.split(" ")[0] === "sigma") {
    const link = message.content.split(" ")[1];

    unlink(path.join(__dirname, "audio.mp3"), (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (message.member.voice.channel) {
      const conn = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();

      const komenda = `yt-dlp -x --audio-format mp3 -o audio.mp3 ${link}`;
      exec(komenda, (err, out, stderr) => {
        if (err) {
          console.log("komand error");
          message.reply("zly link kurwo");
        }

        if (stderr) {
          console.log(stderr);
        }

        const resource = createAudioResource(path.join(__dirname, "audio.mp3"));

        player.play(resource);
        conn.subscribe(player);
      });

      player.on(AudioPlayerStatus.Idle, () => {
        unlink(path.join(__dirname, "audio.mp3"), (err) => {
          if (err) {
            console.log(err);
          }
        });

        conn.destroy();
      });
    }
  }

  if (message.content.toLowerCase() === "!ip") {
    message.reply("Ip: zyga.icu / 79.184.117.45");
  }

  if (message.content.toLowerCase() === "!wersja") {
    message.reply("Wersja: 1.21");
  }

  if (message.content.toUpperCase() == "MATHEW GRASZ DUO?") {
    message.reply("KYS");
  }

  if (message.content === ",") {
    const conn = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    conn.destroy();
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  console.log(interaction);

  if (interaction.commandName === "dis") {
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.member.nickname} jebie mathewa`)
      .setImage(
        "https://th.bing.com/th/id/R.d786da2ec6bfacc6b066f7b80a5e5228?rik=pT24zl1SBLKJtw&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2016%2f12%2fWild-Boar-Wallpapers-HD.jpg&ehk=St5F6QW35D4yqym5OJMKuH628SEHq%2fVpHaq0FKRyasU%3d&risl=&pid=ImgRaw&r=0"
      );

    interaction.reply({ embeds: [embed] });
  }

  if (interaction.commandName === "pogoda") {
    const key = process.env.WEATHER_KEY;
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
    const city = "Ciechanow";

    const URL = baseUrl + "q=" + city + "&appid=" + key;

    fetch(URL)
      .then((result) => result.json())
      .then((data) => {
        console.log(data);

        const embed = new EmbedBuilder()
          .setTitle("Pogoda")
          .setDescription(
            `${data.name}: ${(data.main.temp - 273.15).toFixed(1)} C`
          )
          .setTimestamp();

        interaction.reply({ embeds: [embed] });
      });
  }
});

client.login(KEY);
