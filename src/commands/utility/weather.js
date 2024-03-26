const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Get weather info and forecast on any place!')
    .addStringOption(option =>
      option.setName('city')
        .setDescription('Input city name to see the weather!')
        .setRequired(true))
    .setDMPermission(false),
  async execute(interaction) {
    const city = interaction.options.getString('city');

    const res = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURIComponent(city)}`);
    const json = await res.data;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(json[0].location.name + ' - ' + json[1].current.skytext)
          .setColor(interaction.client.config.embed.default)
          .setThumbnail(json[0].current.imageUrl)
          .addFields(
            { name: 'Latitude', value: json[0].location.lat, inline: true },
            { name: 'Long', value: json[0].location.long, inline: true },
            { name: 'Timezone', value: json[0].location.timezone, inline: true },
            { name: 'Temperature', value: `${json[1].current.temperature}°${json[0].location.degreetype}`, inline: true },
            { name: 'Sky Code', value: json[1].current.skycode, inline: true },
            { name: 'Feels Like', value: json[1].current.feelslike, inline: true },
            { name: 'Humidity', value: json[1].current.humidity, inline: true },
            { name: 'Wind', value: json[1].current.winddisplay, inline: true },
            { name: 'Day', value: json[1].current.day, inline: true },
          ),
      ],
    });
  },
};