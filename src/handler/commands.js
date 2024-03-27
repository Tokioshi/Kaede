require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { clientId } = require('../config/config');
const fs = require('node:fs');
const path = require('node:path');
const chalk = require('chalk');

const commandsPath = path.join(__dirname, '../commands');
const commands = [];

function readCommands(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      readCommands(filePath);
    } else if (file.endsWith('.js')) {
      const command = require(filePath);
      commands.push(command.data.toJSON());
    }
  }
}

readCommands(commandsPath);

const rest = new REST({ version: '10' }).setToken(process.env.token);

(async () => {
  try {
    console.log(chalk.yellowBright(`Started refreshing ${commands.length} application (/) commands.`));

    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );

    console.log(chalk.greenBright(`Successfully reloaded ${data.length} application (/) commands.`));
  } catch (error) {
    console.error(error);
  }
})();