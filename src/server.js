const { longShortEndpoint } = require("./consts");
const { fetchLongShortRates, insertLongShortRate } = require("./db");

const getLongShortRate = async () => {
  try {
    const result = await fetch(longShortEndpoint);
    const data = await result.json();

    if (!data?.length) {
      return;
    }

    const binanceRetail = data[0];
    const longRate = binanceRetail.longRate;
    const shortRate = binanceRetail.shortRate;

    console.log({ longRate, shortRate });

    await insertLongShortRate(longRate, shortRate);
    console.log("data saved in db!");
    console.log("=========");
  } catch (error) {
    console.error(error);
  }
};

const server = async () => {
  try {
    await getLongShortRate();
    setInterval(getLongShortRate, 1000 * 60 * 5);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  server,
};
