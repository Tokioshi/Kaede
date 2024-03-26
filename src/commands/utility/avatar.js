const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Look into your avatar!')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Mention user to look into their avatar!'))
    .setDMPermission(false),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${user.username}'s avatar`)
          .setColor(interaction.client.config.embed.default)
          .setImage(user.displayAvatarURL({ extension: 'png', forceStatic: true, size: 512 })),
      ],
    });
  },
};