'use strict';

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
    handler: function (request, h) {
      return 'hello world';
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
