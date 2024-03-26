const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('neko')
    .setDescription('Get a random neko image!')
    .setDMPermission(false),
  async execute(interaction) {
    const res = await axios.get('https://api.waifu.pics/sfw/neko');
    const json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Neko')
          .setColor(interaction.client.config.embed.default)
          .setImage(json.url),
      ],
    });
  },
};