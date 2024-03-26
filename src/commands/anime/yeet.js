const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yeet')
    .setDescription('Get a random yeet image!')
    .setDMPermission(false),
  async execute(interaction) {
    const res = await axios.get('https://api.waifu.pics/sfw/yeet');
    const json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Yeet')
          .setColor(interaction.client.config.embed.default)
          .setImage(json.url),
      ],
    });
  },
};