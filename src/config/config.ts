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
  currencyProviders: [
    {
      id: 0,
      name: "binance",
      url: "https://api.binance.com/api/v3/ticker/price?symbol={CURRENCY1}{CURRENCY2}",
    },

    {
      id: 1,
      name: "coingeco",
      url: "https://api.coingecko.com/api/v3/simple/price?ids={CURRENCY1}&vs_currencies={CURRENCY2}",
    },
  ],
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
  currencyProviders: [
    {
      id: 0,
      name: "binance",
      url: "https://api.binance.com/api/v3/ticker/price?symbol={CURRENCY1}{CURRENCY2}",
    },

    {
      id: 1,
      name: "coingeco",
      url: "https://api.coingecko.com/api/v3/simple/price?ids={CURRENCY1}&vs_currencies={CURRENCY2}",
    },
  ],
};

const config = {
  dev,
  test,
};

export default config["test"];
