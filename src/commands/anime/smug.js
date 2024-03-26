const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('smug')
    .setDescription('Get a random smug image!')
    .setDMPermission(false),
  async execute(interaction) {
    const res = await axios.get('https://api.waifu.pics/sfw/smug');
    const json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Smug')
          .setColor(interaction.client.config.embed.default)
          .setImage(json.url),
      ],
    });
  },
};