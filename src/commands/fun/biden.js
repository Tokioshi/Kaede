const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('biden')
    .setDescription('Make Biden Tweet Anything!')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('Input text to generate image!')
        .setRequired(true))
    .setDMPermission(false),
  async execute(interaction) {
    let text = interaction.options.getString('text');

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle('Biden tweet!')
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/biden?text=${encodeURIComponent(text)}`)
      ]
    });
  },
};