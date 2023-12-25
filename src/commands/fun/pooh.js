const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pooh')
    .setDescription('Create a meme of a pooh as normal and with a tuxedo!')
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
    let firstText = interaction.options.getString('text-1');
    let secondText = interaction.options.getString('text-2')

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle('Pooh!')
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/pooh?text1=${encodeURIComponent(firstText)}&text2=${encodeURIComponent(secondText)}`)
      ]
    });
  },
};