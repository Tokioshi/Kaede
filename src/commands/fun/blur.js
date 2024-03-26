const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blur')
    .setDescription('Blur your avatar')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Mention a user'))
    .setDMPermission(false),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Blur!')
          .setColor(interaction.client.config.embed.default)
          .setImage(`https://api.popcat.xyz/blur?image=${user.displayAvatarURL({ extension: 'png', size: 512 })}`),
      ],
    });
  },
};