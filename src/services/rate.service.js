const axios = require("axios");

class RateService {
  async getRate(coinPair = "BTCUAH") {
    const response = await axios
      .get(`https://api.binance.com/api/v3/ticker/price?symbol=${coinPair}`)
      .then((res) => {
        return Math.round(res.data["price"]).toString();
      });
    return response;
  }
}

module.exports = new RateService();
