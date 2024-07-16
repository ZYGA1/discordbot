require("dotenv").config();
const { exec } = require("child_process");
const { unlink } = require("fs");
const reg = require("./registercommands");
const setCommands = require("./commandHandler");
const path = require("path");

const { KEY } = process.env;
const {
  Client,
  IntentsBitField,
} = require("discord.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");

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

setCommands(client);
client.player = {
  queue: ['a']
};

console.log(client.player)

let comm = [];
client.commands.forEach((e) => {
  comm.push(e.data);
});

reg(comm);

client.once("ready", () => {
  console.log(`${client.user.username} sigma`);
});

client.on("messageCreate", (message) => {
  console.log(message.author.username, message.content);

  if (message.author.bot) return;

  if (message.content == ".") {
    message.channel.send("KYS")
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

      client.connection = conn;

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
    message.reply("Ip: zyga.icu");
  }

  if (message.content.toLowerCase() === "!wersja") {
    message.reply("Wersja: 1.21");
  }

  if (message.content.toUpperCase() == "MATHEW GRASZ DUO?") {
    message.reply("KYS");
  }

  if (message.content === ",") {

    if(client.connection){
      client.connection.destroy();
    }
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  client.commands.forEach((e) => {
    if (interaction.commandName === e.data.name) {
      console.log(e.data)
      if(e.data.client){
        e.execute(interaction, client)
      }else {
        e.execute(interaction);
      }
      
    }
  });
});

client.login(KEY);
