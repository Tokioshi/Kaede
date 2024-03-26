const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('glomp')
    .setDescription('Get a random glomp image!')
    .setDMPermission(false),
  async execute(interaction) {
    const res = await axios.get('https://api.waifu.pics/sfw/glomp');
    const json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Glomp')
          .setColor(interaction.client.config.embed.default)
          .setImage(json.url),
      ],
    });
  },
};