var rp = require('request-promise');
const Boom = require('boom');

class HelloAssoAPI {

  constructor() {
    this.apiUrl = process.env.HELLOASSO_API_URL;
    this.apiLogin = process.env.HELLOASSO_API_LOGIN;
    this.apiPaswword = process.env.HELLOASSO_API_PASSWORD;
    this.base64LoginChain = Buffer.from(this.apiLogin + ':' + this.apiPaswword).toString('base64');
    this.options = {
      headers: {
        'Authorization': 'Basic ' + this.base64LoginChain
      },
      json: true // Automatically parses the JSON string in the response
    };
  }

  listOrganizations(page = 1, results_per_page = 20) {
    this.options.uri = this.apiUrl + "/organizations.json?page=" + page + "&results_per_page=" + results_per_page;

    return rp(this.options)
      .then(function (organizations) {
        return organizations.resources;
      })
      .catch(function (err) {
        throw err;
      });
  }

  getOrganization(id, page = 1, results_per_page = 20) {
    var _self = this;
    this.options.uri = this.apiUrl + "/organizations/" + id + ".json?page=" + page + "&results_per_page=" + results_per_page;

    return rp(this.options)
      .then(function (organization) {
        return organization;
      })
      .catch(function (err) {
        throw returnError(err, _self.options);
        // throw {
        //   message: err.error.message,
        //   statusCode: err.statusCode,
        //   datas: _self.options
        // };
      });
  }

  getProject() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          apiUrl: this.apiUrl,
          apiLogin: this.apiLogin,
          apiPaswword: this.apiPaswword,
        });
      }, 2000);
    }).then(data => {
      return data.apiUrl;
    });
  }

  returnError(err, datas) {
    switch (err.error.code) {
      case "com.helloasso.api.InvalidResource":
        return Boom.badData(err.error.message, datas);
        break;
      case "com.helloasso.api.MissingParameter":
      case "com.helloasso.api.InvalidParameter":
        return Boom.badRequest(err.error.message, datas);
        break;
      case 401:
        return Boom.unauthorized(err.error.message, datas);
        break;
      case "com.helloasso.api.NonSecureConnection":
        return Boom.forbidden(err.error.message, datas);
        break;
      case "com.helloasso.api.InvalidIdentifier":
        return Boom.notFound(err.error.message, datas);
        break;
      case 405:
        return Boom.methodNotAllowed(err.error.message, datas);
        break;
      case 426:
        return Boom.preconditionRequired(err.error.message, datas);
        break;
      case "com.helloasso.api.ServiceUnavailable":
        return Boom.serverUnavailable(err.error.message, datas);
        break;
      case "com.helloasso.api.ServerError":
      default:
        return Boom.badImplementation(err.error.message, datas);
        break;
    }
  }
}

module.exports = HelloAssoAPI;
