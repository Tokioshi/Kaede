const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gun')
    .setDescription('Get a perfect Gun overlay on your image!')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('Mention a user'))
    .setDMPermission(false),
  async execute(interaction) {
    let user = interaction.options.getUser('user') || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle(`Handsup!`)
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/gun?image=${user.displayAvatarURL({ extension: 'png' })}`)
      ]
    });
  },
};