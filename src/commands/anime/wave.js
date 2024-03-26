const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wave')
    .setDescription('Get a random wave image!')
    .setDMPermission(false),
  async execute(interaction) {
    const res = await axios.get('https://api.waifu.pics/sfw/wave');
    const json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Wave')
          .setColor(interaction.client.config.embed.default)
          .setImage(json.url),
      ],
    });
  },
};