const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('How fast bot can respond?')
    .setDMPermission(false),
  async execute(interaction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(interaction.client.config.embed.default)
          .setDescription(`Pong! \`${interaction.client.ws.ping}\` ms!`),
      ],
    });
  },
};