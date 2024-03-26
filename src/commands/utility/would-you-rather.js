const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('would-you-rather')
    .setDescription('What would you rather?')
    .setDMPermission(false),
  async execute(interaction) {
    const res = await axios.get('https://api.popcat.xyz/wyr');
    const json = await res.data;

    const response = await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('What would you rather?')
          .setColor(interaction.client.config.embed.default)
          .setDescription(`1: ${json.ops1}\n2. ${json.ops2}`),
      ],
      components: [
        new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('1')
              .setLabel('1')
              .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
              .setCustomId('2')
              .setLabel('2')
              .setStyle(ButtonStyle.Primary),
          ),
      ],
    });

    const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60_000 });

    collector.on('collect', async (i) => {
      if (i.user.id !== interaction.user.id) { return; }

      if (i.customId == '1') {
        i.update({
          components: [
            new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId('1')
                  .setLabel('1')
                  .setStyle(ButtonStyle.Secondary)
                  .setDisabled(true),
                new ButtonBuilder()
                  .setCustomId('2')
                  .setLabel('2')
                  .setStyle(ButtonStyle.Primary)
                  .setDisabled(true),
              ),
          ],
        });
      }
      else if (i.customId == '2') {
        i.update({
          components: [
            new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId('1')
                  .setLabel('1')
                  .setStyle(ButtonStyle.Primary)
                  .setDisabled(true),
                new ButtonBuilder()
                  .setCustomId('2')
                  .setLabel('2')
                  .setStyle(ButtonStyle.Secondary)
                  .setDisabled(true),
              ),
          ],
        });
      }
    });
  },
};