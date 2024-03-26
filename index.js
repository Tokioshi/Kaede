const { token } = require('dotenv').config().parsed;
const { Client, GatewayIntentBits, ActivityType, Partials, Options, Collection } = require('discord.js');

class Bot extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
      ],
      presence: {
        activities: [{
          type: ActivityType.Custom,
          name: 'customstatus',
          state: '🔒 Locks'
        }],
        status: 'dnd',
      },
      makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        ReactionManager: 0,
        GuildMemberManager: {
          maxSize: 200,
          keepOverLimit: member => member.id === member.client.user.id,
        },
      }),
      sweepers: {
        ...Options.DefaultSweeperSettings,
        messages: {
          interval: 3_600,
          lifetime: 1_800,
        },
        users: {
          interval: 3_600,
          filter: () => user => user.bot && user.id !== user.client.user.id,
        },
      },
      partials: [Partials.Channel, Partials.GuildMember, Partials.User],
    });

    this.commands = new Collection();
    this.config = require('./src/config/config');

    require('./src/handler/index')(this);
  };
};

const client = new Bot();
client.login(token);