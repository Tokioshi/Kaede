const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('jokeoverhead')
    .setDescription("That guy doesn't get jokes at all lol!")
    .addUserOption(option => 
      option.setName('user')
        .setDescription('Mention a user'))
    .setDMPermission(false),
  async execute(interaction) {
    let user = interaction.options.getUser('user') || interaction.user;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle("It's just a joke!")
        .setColor(interaction.client.config.embed.default)
        .setImage(`https://api.popcat.xyz/jokeoverhead?image=${user.displayAvatarURL({ extension: 'png' })}`)
      ]
    });
  },
};