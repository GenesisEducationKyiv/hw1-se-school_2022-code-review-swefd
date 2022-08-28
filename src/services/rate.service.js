//const COIN_PAIR = require("../../config/config.json").app.coinPair
const axios = require("axios");

class RateService {
  async getRate(coinPair = "BTCUAH") {
    return await axios
      .get(`https://api.binance.com/api/v3/ticker/price?symbol=${coinPair}`)
      .then((res) => {
        return Math.round(res.data["price"]).toString();
      });
  }
}

module.exports = new RateService();
