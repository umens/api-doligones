'use strict';

const chalk = require('chalk');
const Boom = require('boom');

const HelloAssoAPI = require('../utils/helloAssoAPIWrapper');
const HelloWrapper = new HelloAssoAPI();

module.exports = [{
  method: 'GET',
  path: '/hello/{user?}',
  handler: function (request, h) {

    const user = request.params.user ?
      encodeURIComponent(request.params.user) :
      'stranger';

    return `Hello ${user}!`;
  },
  options: {
    description: 'Say hello!',
    notes: 'The user parameter defaults to \'stranger\' if unspecified',
    tags: ['api', 'greeting']
  }
},
{
  method: 'GET',
  path: '/',
  handler: async function (request, h) {
    try {
      request.log(['info', 'api'], chalk.blue(`Listing organismes`));
      var result = await HelloWrapper.listOrganizations();
      // var result = await HelloWrapper.getOrganization('000001150521');
      // var result = await HelloWrapper.getOrganization('00000115521');
      return h.response(result)
      // return result;
    } catch (err) {
      throw err;
    }
  }
},
{
  method: 'GET',
  path: '/another',
  handler: (request, h) => {
    return h.notFound();
    // return 'Hello, world again!';
  }
},
];
