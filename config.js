var convict = require('convict');

var conf = convict({
  "env": {
    "doc": "Current Environment",
    "format": ["development", "staging", "production"],
    "default": "development",
    "env": "PHOURUS_ENV"
  },
  "port": {
    "doc": "Socket Server Port",
    "format": "port",
    "default": 3000,
    "env": "PHOURUS_SOCKET_PORT"
  },
  "salt": {
    "doc": "JWT Salt",
    "format": "*",
    "default": "123abc",
    "env": "PHOURUS_JWT_SALT"
  },
  "db": {
    "host": {
      "doc": "Database Hostname",
      "format": "*",
      "default": "localhost",
      "env": "PHOURUS_DB_HOST"
    },
    "port": {
      "doc": "Database Port",
      "format": "port",
      "default": 3306,
      "env": "PHOURUS_DB_PORT"
    },
    "name": {
      "doc": "Database Name",
      "format": "*",
      "default": "phourus-dev",
      "env": "PHOURUS_DB_NAME"
    },
    "user": {
      "doc": "Database Username",
      "format": "*",
      "default": "root",
      "env": "PHOURUS_DB_USER"
    },
    "pass": {
      "doc": "Database Password",
      "format": "*",
      "default": "",
      "env": "PHOURUS_DB_PASS"
    }
  }
});

conf.validate();
module.exports = conf;
