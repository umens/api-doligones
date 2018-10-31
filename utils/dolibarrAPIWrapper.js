class DolibarrAPI {

  constructor() {
    this.apiUrl = process.env.DOLIBARR_API_URL;
    this.apiKey = process.env.DOLIBARR_API_KEY;
  }

  getProject() {
    return this.apiUrl;
  }
}

module.exports = DolibarrAPI;
