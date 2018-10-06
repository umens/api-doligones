// Requirements
const Glue = require('glue');
const chalk = require('chalk');
const log = console.log;
const dotenv = require('dotenv');
var Confidence = require('confidence');

// Configs & Utils
const config = require('./config/confidence');

// Vars
var store = new Confidence.Store();
store.load(config.manifest);

const startServer = async () => {
  try {
    await dotenv.config();
    const server = await Glue.compose(store.get('/serverConfig', {
      env: process.env.NODE_ENV
    }), {
      relativeTo: __dirname
    });
    await server.start();
    server.log(['success', 'server', 'start'], chalk.green(`Server running at ${server.info.uri}`));
  } catch (err) {
    // server.log(['error', 'server', 'start'], chalk.red(err));    
    log(chalk.red(err));
    process.exit(1);
  }
};

process.on('unhandledRejection', (error) => {
  console.log(error);
  process.exit();
});

startServer();