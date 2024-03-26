const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('drake')
    .setDescription('Create a drake meme')
    .addStringOption(option =>
      option.setName('text-1')
        .setDescription('Input the first text to generate image!')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('text-2')
        .setDescription('Input the second text to generate image!')
        .setRequired(true))
    .setDMPermission(false),
  async execute(interaction) {
    const firstText = interaction.options.getString('text-1');
    const secondText = interaction.options.getString('text-2');

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Drake!')
          .setColor(interaction.client.config.embed.default)
          .setImage(`https://api.popcat.xyz/drake?text1=${encodeURIComponent(firstText)}&text2=${encodeURIComponent(secondText)}`),
      ],
    });
  },
};