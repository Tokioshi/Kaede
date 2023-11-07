const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if(interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if(!command) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription(`Uknow command \`${interaction.commandName}\`.`)
          ],
          ephemeral: true
        });
        return;
      };
  
      try {
        await command.execute(interaction)
      } catch (error) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription(`There's a problem when executing \`${interaction.commandName}\`.`)
          ],
          ephemeral: true
        });
        console.log(error);
      };
    };
  },
};