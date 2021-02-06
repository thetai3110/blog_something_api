let mongoose = require('mongoose');
var constants = require('../common/constants')
class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(constants.mongodb)
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }
}

module.exports = new Database()

