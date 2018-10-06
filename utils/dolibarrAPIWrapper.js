class DolibarrAPI {

  constructor(projects) {
      this.projects = projects;
  }

  getProject(name) {
      return this.projects[name];
  }
}

module.exports = DolibarrAPI;