const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ad')
    .setDescription('Make yourself an ad!')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('Mention a user'))
    .setDMPermission(false),
  async execute(interaction) {
    let user = interaction.options.getUser('user') || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle(`Advertise!`)
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/ad?image=${user.displayAvatarURL({ extension: 'png' })}`)
      ]
    });
  },
};