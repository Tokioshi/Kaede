const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clown')
    .setDescription('This person is a clown!')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('Mention a user'))
    .setDMPermission(false),
  async execute(interaction) {
    let user = interaction.options.getUser('user') || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle(`Clown!`)
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/clown?image=${user.displayAvatarURL({ extension: 'png' })}`)
      ]
    });
  },
};