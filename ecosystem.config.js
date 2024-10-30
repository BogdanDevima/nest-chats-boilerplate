const package = require('./package.json');

const appName = process.env.APP_NAME;
const commonDeployOptions = {
  user: process.env.DEPLOY_SSH_USERNAME,
  host: process.env.DEPLOY_SSH_HOST,
  path: `/opt/${appName}`,
  repo: package.repository.url,
  // commands or local script path to be run on the host before the setup process starts
  'post-setup': 'yarn && yarn build',
  'post-deploy': 'pm2 reload ecosystem.config.js --env production',
};

module.exports = {
  apps: [
    {
      name: `${appName}-backend`,
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      ...commonDeployOptions,
      ref: 'origin/master',
    },
    staging: {
      ...commonDeployOptions,
      ref: 'origin/staging',
    },
  },
};
