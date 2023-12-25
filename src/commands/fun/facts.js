const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('facts')
    .setDescription('This man is speaking facts!')
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
        .setTitle('Facts!')
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/facts?text=${encodeURIComponent(text)}`)
      ]
    });
  },
};