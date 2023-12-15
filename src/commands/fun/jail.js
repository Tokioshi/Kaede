const axios = require('axios');
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('jail')
    .setDescription('Jail avatar')
    .addUserOption(user => 
      Option.setName('user')
        .setDescription('Mention a user to jail their avatar!'))
    .setDMPermission(false),
  async execute(interaction) {
    let user = interaction.options.getUser('user') || interaction.user;

    interaction.deferReply({ ephemeral: true });

    let res = await axios.getAdapter(`https://api.popcat.xyz/jail?image=${user.displayAvatarURL({ extensions: 'png' })}`);
    let json = await res.data;

    interaction.editReply({
      files: [
        new AttachmentBuilder(json.url, { name: 'jail.png' })
      ]
    });
  },
};