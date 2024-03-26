const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('drip')
    .setDescription('Pretend you\'re a rich person by wearing a fake expensive jacket!')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Mention a user'))
    .setDMPermission(false),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Rich Drip!')
          .setColor(interaction.client.config.embed.default)
          .setImage(`https://api.popcat.xyz/drip?image=${user.displayAvatarURL({ extension: 'png' })}`),
      ],
    });
  },
};