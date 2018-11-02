var rp = require('request-promise');
const Boom = require('boom');

class DolibarrAPI {

  constructor() {
    this.apiUrl = process.env.DOLIBARR_API_URL;
    this.apiKey = process.env.DOLIBARR_API_KEY;
    this.options = {
      headers: {
        'dolapikey': this.apiKey
      },
      json: true // Automatically parses the JSON string in the response
    };
  }

  getAdherentByEmail(email) {
    this.options.uri = this.apiUrl + "/members?sortfield=t.rowid&sortorder=ASC&limit=1&sqlfilters=(t.email:=:'" + email + "')";

    return rp.get(this.options)
      .then(function (member) {
        return member[0];
      })
      .catch(function (err) {
        var error = err.error.error;
        switch (error.code) {
          case 404:
            return null;
            break;
          default:
            throw Boom.badImplementation(error.message);
            break;
        }        
      });
  }

  createGonesMember(member) {
    this.options.uri = this.apiUrl + "/members/gones";
    this.options.body = member;

    return rp.post(this.options)
      .then(function (member_id) {
        member['id'] = member_id;
        return member;
      })
      .catch(function (err) {
        var error = err.error.error;
        switch (error.code) {
          case 404:
            return null;
            break;
          default:
            throw Boom.badImplementation(error.message);
            break;
        }        
      });
  }

  updateGonesMember(id, member) {
    this.options.uri = this.apiUrl + "/members/gones/" + id;
    this.options.body = member;

    return rp.put(this.options)
      .then(function (member) {
        return member;
      })
      .catch(function (err) {
        var error = err.error.error;
        switch (error.code) {
          case 404:
            return null;
            break;
          default:
            throw Boom.badImplementation(error.message);
            break;
        }        
      });
  }
}

module.exports = DolibarrAPI;
