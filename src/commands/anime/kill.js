const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kill')
    .setDescription('Get a random kill image!')
    .setDMPermission(false),
  async execute(interaction) {
    let res = await axios.get('https://api.waifu.pics/sfw/kill');
    let json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle('Kill')
        .setColor(interaction.client.config.embed.default)
        .setImage(json.url)
      ]
    });
  },
};