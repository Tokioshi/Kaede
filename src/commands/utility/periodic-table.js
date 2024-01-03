const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('periodic-table')
    .setDescription('Get a random element from the periodic table or get info on a chemical element!')
    .addStringOption(option =>
      option.setName('element')
        .setDescription('Input the element name to get info!'))
    .setDMPermission(false),
  async execute(interaction) {
    let element = interaction.options.getString('element');
    if(element) {
      let res = await axios.get(`https://api.popcat.xyz/periodic-table?element=${element}`);
      let json = await res.data;

      if(json.error) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor(interaction.client.config.embed.fail)
            .setDescription('Please input a valid element!')
          ],
          ephemeral: true
        });
      };
      
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle(`${json.name} | ${json.symbol}`)
          .setColor(interaction.client.config.embed.default)
          .setThumbnail(json.image)
          .setDescription(`Atomic Number: ${json.atomic_number}\nAtomic Mass: ${json.atomic_mass}\nPeriod: ${json.period}\nPhase: ${json.phase}\nDiscovered by: ${json.discovered_by}\nSummary: ${json.summary}`)
          .setImage(json.color_image)
        ]
      });
    } else {
      let res = await axios.get('https://api.popcat.xyz/periodic-table/random');
      let json = await res.data;

      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle(`${json.name} | ${json.symbol}`)
          .setColor(interaction.client.config.embed.default)
          .setThumbnail(json.image)
          .setDescription(`Atomic Number: ${json.atomic_number}\nAtomic Mass: ${json.atomic_mass}\nPeriod: ${json.period}\nPhase: ${json.phase}\nDiscovered by: ${json.discovered_by}\nSummary: ${json.summary}`)
          .setImage(json.color_image)
        ]
      });
    };
  },
};