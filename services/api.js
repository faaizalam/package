const Headers = require("../utils");
const axios = require("axios");
const GetData = async ({
  headersName,
  event,
  _proxyAgent,
  _cookieData

}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { url, ...headerArgs } = new Headers(headersName, { event, _cookieData }).getHeaders();
      
      let abortController = new AbortController();
      const timeout = setTimeout(() => {
        abortController.abort();
      }, 10000);

      const response = await axios
        .get(
          url,
          {

            httpsAgent: _proxyAgent,

            headers: headerArgs,
            signal: abortController.signal
          },

        )

        .catch((e) => {
          return e

        }).finally(() => clearTimeout(timeout));







      if (response?.status === 200) return resolve(response);

      const status = response?.response?.status;
      if (status === 400 || status === 403) return resolve(response);

      return reject(response)

    } catch (e) {

      return reject(e);
    }
  });
};


module.exports = GetData