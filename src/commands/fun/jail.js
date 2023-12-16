const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { capitalizeFirstLetter } = require('../../function/index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('jail')
    .setDescription('Jail avatar')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('Mention a user to jail their avatar!'))
    .setDMPermission(false),
  async execute(interaction) {
    let user = interaction.options.getUser('user') || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle(`\`${capitalizeFirstLetter(interaction.user.username)}\` jail \`${capitalizeFirstLetter(user.username)}\`!`)
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/jail?image=${user.displayAvatarURL({ extension: 'png', size: 512 })}`)
      ]
    });
  },
};