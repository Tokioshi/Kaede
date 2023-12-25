const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('oogway')
    .setDescription("Create an 'Oogway Quote' meme!")
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
        .setTitle('Oogway said!')
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/oogway?text=${encodeURIComponent(text)}`)
      ]
    });
  },
};