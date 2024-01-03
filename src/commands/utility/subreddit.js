const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('subreddit')
    .setDescription('Get tons of info on a subreddit!')
    .addStringOption(option =>
      option.setName('subreddit')
        .setDescription('Input subreddit name to get info!')
        .setRequired(true))
    .setDMPermission(false),
  async execute(interaction) {
    let subreddit = interaction.options.getString('subreddit');

    let res = await axios.get(`https://api.popcat.xyz/subreddit/${encodeURIComponent(subreddit)}`);
    let json = await res.data;

    if(json.error) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor(interaction.client.config.embed.fail)
          .setDescription('Please input a valid subreddit name!')
        ],
        ephemeral: true
      });
    };

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle(json.title)
        .setColor(interaction.client.config.embed.default)
        .setThumbnail(json.icon)
        .setURL(json.url)
        .setDescription(json.description)
        .addFields(
          { name: 'Name', value: `${json.name}`, inline: true },
          { name: 'Active User', value: `${json.active_users}`, inline: true },
          { name: 'Member', value: `${json.members}`, inline: true },
          { name: 'Send Video', value: `${json.allow_videos = json.allow_videos ? 'Yes' : 'No'}`, inline: true },
          { name: 'Send Image', value: `${json.allow_images = json.allow_images ? 'Yes' : 'No'}`, inline: true },
          { name: 'Over 18+', value: `${json.over_18 = json.over_18 ? 'Yes' : 'No'}`, inline: true }
        )
      ]
    });
  },
};