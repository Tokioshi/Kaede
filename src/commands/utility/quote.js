const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Get random Quotes!')
    .setDMPermission(false),
  async execute(interaction) {
    let res = await axios.get('https://api.popcat.xyz/quote');
    let json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle('Random quote!')
        .setColor(interaction.client.config.embed.default)
        .setDescription(`${json.quote}`)
      ]
    });
  },
};