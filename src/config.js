const config = {
  prod: {
    PORT: 8080
  },
  dev: {
    PORT: 8080
  }
};

// module.exports = config[process.NODE_ENV] || config.dev;
module.exports = config.dev;
