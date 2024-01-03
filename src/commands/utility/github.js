const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { capitalizeFirstLetter, dateForm2 } = require('../../function/index');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('github')
    .setDescription('Get info on a github user just by entering their username!')
    .addStringOption(option =>
      option.setName('username')
        .setDescription('Input github username to see their info!')
        .setRequired(true))
    .setDMPermission(false),
  async execute(interaction) {
    let users = interaction.options.getString('username');

    let res = await axios.get(`https://api.popcat.xyz/github/${encodeURIComponent(users)}`);
    let json = await res.data;

    if(json.error) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor(interaction.client.config.embed.fail)
          .setDescription('Please input a valid user name!')
        ],
        ephemeral: true
      });
    };

    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setTitle(capitalizeFirstLetter(json.name))
        .setColor(interaction.client.config.embed.default)
        .setThumbnail(json.avatar)
        .setURL(json.url)
        .setDescription(json.bio)
        .addFields(
          { name: 'Account Type', value: json.account_type, inline: true },
          { name: 'Company', value: json.company, inline: true },
          { name: 'Repository', value: json.public_repos, inline: true },
          { name: 'Followers', value: json.followers, inline: true },
          { name: 'Following', value: json.following, inline: true },
          { name: 'Location', value: json.location, inline: true },
          { name: 'Email', value: json.email, inline: true },
          { name: 'Create', value: dateForm2(json.created_at), inline: true },
          { name: 'Updated', value: dateForm2(json.updated_at), inline: true }
        )
      ]
    });
  },
};