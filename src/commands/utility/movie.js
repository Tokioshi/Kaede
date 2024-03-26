const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { capitalizeFirstLetter, dateForm } = require('../../function/index');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('movie')
    .setDescription('Get information about a movie from IMDB')
    .addStringOption(option =>
      option.setName('movie')
        .setDescription('Please input movie name to see the information!')
        .setRequired(true))
    .setDMPermission(false),
  async execute(interaction) {
    const movie = interaction.options.getString('movie');

    const res = await axios.get(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(movie)}`);
    const json = await res.data;

    if (json.error) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(interaction.client.config.embed.fail)
            .setDescription('Please input a valid movie title!'),
        ],
        ephemeral: true,
      });
    }

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${json.title} | ${json.year}`)
          .setURL(json.imdburl)
          .setColor(interaction.client.config.embed.default)
          .setThumbnail(json.poster)
          .setDescription(json.plot)
          .addFields(
            { name: 'Release Date', value: dateForm(json.released), inline: true },
            { name: 'Genres', value: json.genres, inline: true },
            { name: 'Languages', value: json.languages, inline: true },
            { name: 'Type', value: capitalizeFirstLetter(json.type), inline: true },
            { name: 'Duration', value: json.runtime, inline: true },
            { name: 'Rating', value: json.ratings[0].value, inline: true },
          )
          .setFooter({ text: `Directored by ${json.director}` })
          .setTimestamp(),
      ],
    });
  },
};