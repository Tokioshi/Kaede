const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fact')
    .setDescription('Random fact!')
    .setDMPermission(false),
  async execute(interaction) {
    const res = await axios.get('https://api.popcat.xyz/fact');
    const json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Random fact!')
          .setColor(interaction.client.config.embed.default)
          .setDescription(`${json.fact}`),
      ],
    });
  },
};