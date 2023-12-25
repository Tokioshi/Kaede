const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { capitalizeFirstLetter } = require('../../function/index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('Make a lovely combination withh someone')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('Mention a user')
        .setRequired(true))
    .setDMPermission(false),
  async execute(interaction) {
    let user = interaction.options.getUser('user');

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle(`Lovely \`${capitalizeFirstLetter(interaction.user.username)}\` with \`${capitalizeFirstLetter(user.username)}\`!`)
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/ship?user1=${interaction.user.displayAvatarURL({ extension: 'png' })}&user2=${user.displayAvatarURL({ extension: 'png' })}`)
      ]
    });
  },
};