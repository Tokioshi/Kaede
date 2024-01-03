const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activities: [{ name: 'on progress', type: ActivityType.Watching }], status: 'idle' });
  },
};