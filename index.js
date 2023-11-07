require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');

class Bot extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
      ],
    });

    this.commands = new Collection();
    this.config = require('./src/config/config');

    require('./src/handler/index')(this);
  };
};

const client = new Bot();
client.login(process.env.token);