const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick-anime')
    .setDescription('Get a random kick image!')
    .setDMPermission(false),
  async execute(interaction) {
    let res = await axios.get('https://api.waifu.pics/sfw/kick');
    let json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle('Kick')
        .setColor(interaction.client.config.embed.default)
        .setImage(json.url)
      ]
    });
  },
};