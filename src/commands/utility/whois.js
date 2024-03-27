const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { getUserPermissions } = require('../../function/index.js');
const moment = require('moment');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('whois')
    .setDescription('Get user information')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Mention someone to see their information'))
    .setDMPermission(false),
  async execute(interaction) {
    const member = interaction.options.getMember('user') || interaction.member;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${member.user.username}`, iconURL: member.user.displayAvatarURL({ extension: 'png', forceStatic: true }) })
      .setColor(interaction.client.config.embed.default)
      .setThumbnail(member.user.displayAvatarURL({ extension: 'png', forceStatic: true }))
      .setDescription(`${member}`)
      .addFields(
        { name: 'Joined', value: `${moment(member.joinedAt).format('ddd, MMM D, YYYY h:mm A')}`, inline: true },
        { name: 'Registered', value: `${moment(member.user.createdAt).format('ddd, MMM D, YYYY h:mm A')}`, inline: true },
        { name: `Roles [${member.roles.cache.filter(r => r.id !== interaction.guild.id).map(roles => `\`${roles.name}\``).length}]`, value: `${member.roles.cache.filter(r => r.id !== interaction.guild.id).sort((a, b) => b.position - a.position).map(roles => `<@&${roles.id }>`).join(' ') || 'None'}` },
        { name: 'Key Permissions', value: `${getUserPermissions(member)}`, inline: true },
      )
      .setFooter({ text: `ID: ${member.user.id}` })
      .setTimestamp();

    if (member.id == interaction.guild.ownerId) {
      embed.addFields(
        { name: 'Acknowledgements', value: 'Server Owner' },
      );
    } else if (member.permissions.has(PermissionFlagsBits.Administrator)) {
      embed.addFields(
        { name: 'Acknowledgements', value: 'Server Admin' },
      );
    }

    interaction.reply({
      embeds: [embed],
    });
  },
};