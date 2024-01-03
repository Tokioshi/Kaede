const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cry')
    .setDescription('Get a random cry image!')
    .setDMPermission(false),
  async execute(interaction) {
    let res = await axios.get('https://api.waifu.pics/sfw/cry');
    let json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle('Cry')
        .setColor(interaction.client.config.embed.default)
        .setImage(json.url)
      ]
    });
  },
};