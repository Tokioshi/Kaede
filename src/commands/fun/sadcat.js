const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sadcat')
    .setDescription('DidMake a Sad Cat Meme!')
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
        .setTitle("That's sad...")
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/sadcat?text=${encodeURIComponent(text)}`)
      ]
    });
  },
};