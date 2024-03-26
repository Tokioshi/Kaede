const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('alert')
    .setDescription('Make a fake iPhone alert picture!')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('Input text to generate image!')
        .setRequired(true))
    .setDMPermission(false),
  async execute(interaction) {
    const text = interaction.options.getString('text');

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Alert!')
          .setColor(interaction.client.config.embed.default)
          .setImage(`https://api.popcat.xyz/alert?text=${encodeURIComponent(text)}`),
      ],
    });
  },
};