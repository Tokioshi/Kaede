const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mnm')
    .setDescription('Make your picture into a shape of m&ms!')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Mention a user'))
    .setDMPermission(false),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('MNM!')
          .setColor(interaction.client.config.embed.default)
          .setImage(`https://api.popcat.xyz/mnm?image=${user.displayAvatarURL({ extension: 'png' })}`),
      ],
    });
  },
};