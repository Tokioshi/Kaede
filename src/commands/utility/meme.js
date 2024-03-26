const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Get a meme from reddit!')
    .setDMPermission(false),
  async execute(interaction) {
    const res = await axios.get('https://api.popcat.xyz/meme');
    const json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(json.title)
          .setURL(json.url)
          .setColor(interaction.client.config.embed.default)
          .setImage(json.image)
          .setFooter({ text: `Upvote: ${json.upvotes} | Comment: ${json.comments}` })
          .setTimestamp(),
      ],
    });
  },
};