require("dotenv").config();

const dev = {
  app: {
    PORT: "8080",
    fakeSMTP: "true",
    coinPair: "BTCUAH",
  },
  mailTrap: {
    host: "smtp.mailtrap.io",
    port: "2525",
    user: "7a37b2c854d917",
    pass: "5e5e09f4d76338",
    from: "gses2btc.uah@mail.com",
    subject: "BTC Rate BTC/UAH",
  },
  mail: {
    API_KEY: "Get your own key :)",
    host: "smtp-relay.sendinblue.com",
    port: "587",
    from: "gses2btc.uah@mail.com",
    subject: "BTC Rate BTC/UAH",
  },
  db: {
    path: "/src/models/db.txt",
  },
};

const test = {
  app: {
    PORT: "8080",
    fakeSMTP: "true",
    coinPair: "BTCUAH",
  },
  mailTrap: {
    host: "smtp.mailtrap.io",
    port: "2525",
    user: "7a37b2c854d917",
    pass: "5e5e09f4d76338",
    from: "gses2btc.uah@mail.com",
    subject: "BTC Rate BTC/UAH",
  },
  mail: {
    API_KEY: "Get your own key :)",
    host: "smtp-relay.sendinblue.com",
    port: "587",
    from: "gses2btc.uah@mail.com",
    subject: "BTC Rate BTC/UAH",
  },
  db: {
    path: "/src/models/db.txt",
  },
};

const config = {
  dev,
  test,
};

module.exports = config[process.env.NODE_ENV];
