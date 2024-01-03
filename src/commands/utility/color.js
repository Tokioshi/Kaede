const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('color')
    .setDescription('Get a random hex color with an image & name or get info on a hex color!')
    .addStringOption(option =>
      option.setName('hex-code')
        .setDescription('Input a valid hex code to get info!'))
    .setDMPermission(false),
  async execute(interaction) {
    let hcode = interaction.options.getString('hex-code');
    if(hcode) {
      let res = await axios.get(`https://api.popcat.xyz/color/${hcode}`);
      let json = await res.data;

      if(json.error) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor(interaction.client.config.embed.fail)
            .setDescription('Please input a valid hex-code!')
          ],
          ephemeral: true
        });
      };
      
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle(`${json.name}`)
          .setColor(json.hex)
          .setDescription(`Hex: ${json.hex} | Rgb: ${json.rgb} | Brightened: ${json.brightened}`)
          .setImage(json.color_image)
        ]
      });
    } else {
      let res = await axios.get('https://api.popcat.xyz/randomcolor');
      let json = await res.data;

      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle(`${json.name} | ${json.hex}`)
          .setColor(`${json.hex}`)
          .setImage(json.image)
        ]
      });
    };
  },
};