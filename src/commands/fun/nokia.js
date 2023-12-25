const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nokia')
    .setDescription('Add your avatar on a nokia screen!')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('Mention a user'))
    .setDMPermission(false),
  async execute(interaction) {
    let user = interaction.options.getUser('user') || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle(`Nokia!`)
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/nokia?image=${user.displayAvatarURL({ extension: 'png' })}`)
      ]
    });
  },
};