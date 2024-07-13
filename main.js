const dotenv = require("dotenv");
const ydtl = require('ytdl-core')
dotenv.config();
const path = require('path');


const { KEY } = process.env;
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

client.once('ready', () => {
  console.log(`${client.user.username} sigma`);
});

client.on('messageCreate',  (message) => {
  console.log(message.author.username, message.content);

  if (message.author.bot) return;

  if (message.content === '.') {
    message.reply("Chuj ci w dupe");

    if (message.member.voice.channel) {
      const conn = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      
      const player = createAudioPlayer();
      const stream = ydtl("https://www.youtube.com/embed/5aYwU4nj5QA", {filter: 'audioonly'})
      const resource = createAudioResource(stream);

      player.play(resource);
      conn.subscribe(player);


      player.on(AudioPlayerStatus.Idle, () => {
        conn.destroy();
      });


    }
  }

  if (message.content === ',') {
    const conn = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      conn.destroy()
  }
});

client.on('interactionCreate',  (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  console.log(interaction);

  if (interaction.commandName === 'dis') {
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.member.nickname} jebie mathewa`)
      .setImage("https://th.bing.com/th/id/R.d786da2ec6bfacc6b066f7b80a5e5228?rik=pT24zl1SBLKJtw&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2016%2f12%2fWild-Boar-Wallpapers-HD.jpg&ehk=St5F6QW35D4yqym5OJMKuH628SEHq%2fVpHaq0FKRyasU%3d&risl=&pid=ImgRaw&r=0");

     interaction.reply({ embeds: [embed] });
  }
});

client.login(KEY);
