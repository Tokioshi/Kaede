const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('noom')
    .setDescription('Get a random noom image!')
    .setDMPermission(false),
  async execute(interaction) {
    let res = await axios.get('https://api.waifu.pics/sfw/noom');
    let json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle('Noom')
        .setColor(interaction.client.config.embed.default)
        .setImage(json.url)
      ]
    });
  },
};