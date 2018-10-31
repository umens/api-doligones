'use strict';

const Pkg = require('../package.json');

exports.manifest = {
  serverConfig: {
    server: {
      $filter: 'env',
      "production": {
        // "cache": 'redis',
        "port": 4000
      },
      "$default": {
        "port": 3000
      }
    },
    register: {
      "$filter": "env",
      "production": {
        plugins: [
          'inert',
          'vision',
          {
            plugin: "hapi-swagger",
            options: {
              info: {
                title: Pkg.name + " API Documentation",
                version: Pkg.version
              },
              tagsGroupingFilter: (tag) => tag !== 'api' && tag !== 'health' && !tag.match(/^v\d+/),
              grouping: "tags"
            }
          },
          {
            plugin: "good",
            options: {
              ops: {
                interval: 1000
              },
              reporters: {
                console: [{
                  module: "good-squeeze",
                  name: "Squeeze",
                  args: [{
                    // ops: '*',
                    response: "*",
                    log: "*",
                    error: "*",
                    request: "*"
                  }]
                },
                {
                  module: "white-out",
                  args: [{
                    password: "remove",
                    email: "^(.*)(?=@)"
                  }]
                },
                {
                  module: "good-console",
                  args: [{
                    format: "[[]DD/MMM/YYYY HH:mm:ss ZZ[]]"
                  }]
                },
                  "stdout"
                ],
                file: [{
                  module: 'good-squeeze',
                  name: 'Squeeze',
                  args: [{
                    // ops: '*',
                    response: "*",
                    log: "*",
                    error: "*",
                    request: "*"
                  }]
                },
                {
                  module: 'good-squeeze',
                  name: 'SafeJson',
                  args: [
                    null,
                    {
                      separator: ','
                    }
                  ]
                },
                {
                  module: 'rotating-file-stream',
                  args: [
                    'ops.log',
                    {
                      size: '1000B',
                      path: './logs'
                    }
                  ]
                }
                ]
              }
            }
          },
          {
            plugin: "hapijs-status-monitor",
            options: {
              title: 'Monitor ' + Pkg.name,
              path: "/status",
              routeConfig: {
                auth: false
              }
            }
          },
          'hapi-auto-route',
          {
            plugin: require('disinfect'),
            options: {
              disinfectQuery: true,
              disinfectParams: true,
              disinfectPayload: true
            }
          },
          'hapi-response-time',
          'hapi-boom-decorators'
        ],
        options: {
          once: true
        }
      },
      "$default": {
        plugins: [
          'inert',
          'vision',
          {
            plugin: "hapi-swagger",
            options: {
              info: {
                title: Pkg.name + " API Documentation",
                version: Pkg.version
              },
              tagsGroupingFilter: (tag) => tag !== 'api' && tag !== 'health' && !tag.match(/^v\d+/),
              grouping: "tags"
            }
          },
          {
            plugin: "good",
            options: {
              ops: {
                interval: 1000
              },
              reporters: {
                console: [{
                  module: "good-squeeze",
                  name: "Squeeze",
                  args: [{
                    // ops: '*',
                    response: "*",
                    log: "*",
                    error: "*",
                    request: "*"
                  }]
                },
                {
                  module: "white-out",
                  args: [{
                    password: "remove",
                    email: "^(.*)(?=@)"
                  }]
                },
                {
                  module: "good-console",
                  args: [{
                    format: "[[]DD/MMM/YYYY HH:mm:ss ZZ[]]"
                  }]
                },
                  "stdout"
                ],
                file: [{
                  module: 'good-squeeze',
                  name: 'Squeeze',
                  args: [{
                    // ops: '*',
                    response: "*",
                    log: "*",
                    error: "*",
                    request: "*"
                  }]
                }, {
                  module: 'good-squeeze',
                  name: 'SafeJson'
                }, {
                  module: 'good-file',
                  args: ['./logs/development.log']
                }]
              }
            }
          },
          'hapi-auto-route',
          {
            plugin: require('disinfect'),
            options: {
              disinfectQuery: true,
              disinfectParams: true,
              disinfectPayload: true
            }
          },
          'hapi-response-time',
          'hapi-boom-decorators'
        ],
        options: {
          once: true
        }
      }
    }
  }
  // database: {
  //   $filter: 'env',
  //   production: 'foo_production',
  //   staging: 'foo_staging',
  //   development: 'foo_development'
  // }
};
