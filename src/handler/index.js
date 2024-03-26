const fs = require('node:fs');
const path = require('node:path');
require('./commands');

module.exports = async (client) => {
  const commandsPath = path.join(__dirname, '../commands');
  function readCommands(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        readCommands(filePath);
      }
      else if (file.endsWith('.js')) {
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
          client.commands.set(command.data.name, command);
        }
        else {
          console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
      }
    }
  }

  const eventsPath = path.join(__dirname, '../events');
  function readEvents(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        readEvents(filePath);
      }
      else if (file.endsWith('.js')) {
        const event = require(filePath);
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
        }
        else {
          client.on(event.name, (...args) => event.execute(...args));
        }
      }
    }
  }

  readCommands(commandsPath);
  readEvents(eventsPath);
};