'use strict';

const chalk = require('chalk');
const Boom = require('boom');
const fs = require("fs");

const HelloAssoAPI = require('../utils/helloAssoAPIWrapper');
const HelloWrapper = new HelloAssoAPI();
const DolibarrAPI = require('../utils/dolibarrAPIWrapper');
const DolibarrWrapper = new DolibarrAPI();

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
  path: '/createGonesMembersDoliAPI',
  handler: async function (request, h) {
    try {
      request.log(['info', 'api'], chalk.blue(`creating Members`));
      var contents = fs.readFileSync("gones_licences_infos_perso.json");
      var jsonContent = JSON.parse(contents);
      for (var line of jsonContent) {
        var member = await DolibarrWrapper.getAdherentByEmail(line.email);
        var result = null;
        if (member === null) {
          result = await DolibarrWrapper.createGonesMember(line);
          request.log(['info', 'api'], chalk.blue(`creating member ${line.lastname} ${line.firstname}`));
        } else {
          result = await DolibarrWrapper.updateGonesMember(member.id, line);
          request.log(['info', 'api'], chalk.blue(`updating member ${member.email}`));
        }
      }
      return h.response('Members created');
    } catch (err) {
      throw err;
    }
  }
},
];
