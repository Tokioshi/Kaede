const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Look into server information')
    .setDMPermission(false),
  async execute(interaction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ extension: 'png', forceStatic: true }) })
          .setColor(interaction.client.config.embed.default)
          .setThumbnail(interaction.guild.iconURL({ extension: 'png', forceStatic: true }))
          .addFields(
            { name: 'Owner', value: `${await interaction.guild.fetchOwner()}`, inline: true },
            { name: 'Members', value: `${interaction.guild.memberCount}`, inline: true },
            { name: 'Roles', value: `${interaction.guild.roles.cache.size}`, inline: true },
            { name: 'Category Channels', value: `${interaction.guild.channels.cache.filter((c) => c.type == ChannelType.GuildCategory).size}`, inline: true },
            { name: 'Text Channels', value: `${interaction.guild.channels.cache.filter((c) => c.type == ChannelType.GuildText).size}`, inline: true },
            { name: 'Voice Channels', value: `${interaction.guild.channels.cache.filter((c) => c.type == ChannelType.GuildVoice).size}`, inline: true },
          )
          .setFooter({ text: `ID: ${interaction.guild.id} | Server Created` })
          .setTimestamp(interaction.guild.createdAt),
      ],
    });
  },
};
