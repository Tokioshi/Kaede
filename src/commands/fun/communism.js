const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('communism')
    .setDescription('Create a communist overlay!')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('Mention a user'))
    .setDMPermission(false),
  async execute(interaction) {
    let user = interaction.options.getUser('user') || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle(`Communism!`)
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/communism?image=${user.displayAvatarURL({ extension: 'png', size: 512 })}`)
      ]
    });
  },
};