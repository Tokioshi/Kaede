const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unforgiveable')
    .setDescription('Did you know that some sins are unforgivable?')
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
          .setTitle('Unforgiveable!')
          .setColor(interaction.client.config.embed.default)
          .setImage(`https://api.popcat.xyz/unforgivable?text=${encodeURIComponent(text)}`),
      ],
    });
  },
};