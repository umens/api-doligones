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
              reporters: {
                console: [{
                    module: "good-squeeze",
                    name: "Squeeze",
                    args: [{
                      response: "*",
                      log: "*"
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
          'hapi-auto-route'
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
              reporters: {
                console: [{
                    module: "good-squeeze",
                    name: "Squeeze",
                    args: [{
                      response: "*",
                      log: "*"
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
                ]
              }
            }
          },
          'hapi-auto-route'
        ],
        options: {
          once: true
        }
      }
    }
  },
  // database: {
  //   $filter: 'env',
  //   production: 'foo_production',
  //   staging: 'foo_staging',
  //   development: 'foo_development'
  // }
};
