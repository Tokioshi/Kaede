const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uncover')
    .setDescription('Ooo! This person was hiding behind the wall all the time?!')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('Mention a user'))
    .setDMPermission(false),
  async execute(interaction) {
    let user = interaction.options.getUser('user') || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle(`They hidding?!`)
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/uncover?image=${user.displayAvatarURL({ extension: 'png' })}`)
      ]
    });
  },
};